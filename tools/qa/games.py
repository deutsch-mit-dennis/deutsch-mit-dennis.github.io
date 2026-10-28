#!/usr/bin/env python3
"""Game bot: plays every learning game (#spiele/<id>) and every option to the result page at 390 and 320 px,
with a fast-forwarded clock. Reports JS errors, games that never finish, page overflow, and sentences that fell
back to the robotic device voice (tts) instead of a recorded MP3 (mp3). Lino (canvas jump'n'run) is skipped.

Usage (from repo root, site served on :8765):  python3 tools/qa/games.py [game_id ...]
Results: qa-out/games.json
"""
import asyncio, json, os, random, sys
from playwright.async_api import async_playwright
BASE="http://localhost:8765/"
async def run_variant(b, gid, opt, vw):
    ctx=await b.new_context(viewport={"width":vw,"height":740},is_mobile=True,has_touch=True)
    pg=await ctx.new_page()
    await pg.clock.install()
    errs=[]
    pg.on("pageerror",lambda e: errs.append("JS "+str(e)[:200]))
    pg.on("console",lambda m: errs.append("console "+m.text[:200]) if m.type=="error" else None)
    pg.on("response",lambda r: errs.append("HTTP%d %s"%(r.status,r.url)) if r.status>=400 and "localhost" in r.url else None)
    await pg.add_init_script("""window.__tts=[];const _s=window.speechSynthesis&&window.speechSynthesis.speak.bind(window.speechSynthesis);
      if(window.speechSynthesis){window.speechSynthesis.speak=u=>{window.__tts.push(u.text);setTimeout(()=>{try{u.onend&&u.onend({})}catch(e){}},50)}}
      window.__mp3=[];const P=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){window.__mp3.push(this.currentSrc||this.src);const t=this;setTimeout(()=>{try{t.dispatchEvent(new Event('ended'))}catch(e){}},80);return Promise.resolve()};""")
    await pg.goto(BASE+"#spiele/"+gid)
    await pg.clock.run_for(2500)
    if opt is not None:
        await pg.evaluate("v=>{const r=[...document.querySelectorAll('input[name=sp-opt]')].find(x=>x.value===v);r&&(r.checked=true)}",opt)
    await pg.click("#sp-start")
    done=False; steps=0; over=0
    for steps in range(2500):
        if await pg.evaluate("!!document.querySelector('.sp-result')"): done=True; break
        act=await pg.evaluate("""()=>{const root=document.querySelector('.sp-play');if(!root)return 'noroot';
          if(document.documentElement.scrollWidth>innerWidth+1) window.__over=(window.__over||0)+1;
          const n=document.getElementById('sp-next'); if(n&&!n.hidden){n.click();return 'next'}
          const inp=[...root.querySelectorAll('input[type=text],textarea')].find(i=>!i.disabled&&i.offsetParent&&!i.value);
          if(inp){inp.value='Test';inp.dispatchEvent(new Event('input',{bubbles:true}));return 'typed'}
          const bs=[...root.querySelectorAll('button,[role=button],.ch-opt,[tabindex="0"]')].filter(b=>!b.disabled&&(b.offsetParent||b instanceof SVGElement)&&b.id!=='sp-next'&&!/pause|⏸|beenden|abbrechen|aufgeben|🔊|anhören|vorlesen/i.test((b.getAttribute('aria-label')||'')+' '+(b.textContent.length<4?b.textContent:'')));
          if(bs.length&&Math.random()<0.85){const b=bs[Math.floor(Math.random()*bs.length)];(b.click?b.click():b.dispatchEvent(new MouseEvent('click',{bubbles:true})));b.dispatchEvent(new MouseEvent('click',{bubbles:true}));return 'btn:'+b.textContent.trim().slice(0,20)}
          return 'key'}""")
        if act=='noroot': break
        if act=='key':
            await pg.keyboard.press(random.choice(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Space","Enter"]))
        await pg.clock.run_for(random.choice([150,400,900]))
    over=await pg.evaluate("window.__over||0")
    tts=await pg.evaluate("window.__tts"); mp3=await pg.evaluate("window.__mp3")
    await ctx.close()
    return {"game":gid,"opt":opt,"vw":vw,"done":done,"steps":steps,"errs":errs[:8],"overflowFrames":over,"tts_fallback":tts[:30],"n_tts":len(tts),"n_mp3":len(mp3)}
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        ctx=await b.new_context(); pg=await ctx.new_page(); await pg.goto(BASE+"#spiele"); await pg.wait_for_timeout(2000)
        games=await pg.evaluate("DMGame.list().map(g=>({id:g.id,opts:(g.options||[]).map(o=>o.id)}))")
        await ctx.close()
        only=sys.argv[1:]
        out=[]
        for g in games:
            if g["id"]=="lino" or (only and g["id"] not in only): continue
            for o in (g["opts"] or [None]):
                for vw in (390,320):
                    try: r=await run_variant(b,g["id"],o,vw)
                    except Exception as e: r={"game":g["id"],"opt":o,"vw":vw,"exc":str(e)[:300]}
                    out.append(r); print(json.dumps({k:r.get(k) for k in ("game","opt","vw","done","steps","errs","overflowFrames","n_tts","n_mp3","exc")},ensure_ascii=False),flush=True)
        os.makedirs("qa-out",exist_ok=True); json.dump(out,open("qa-out/games.json","w"),ensure_ascii=False,indent=1)
        bad=[r for r in out if r.get("exc") or not r.get("done") or r.get("errs") or r.get("overflowFrames") or r.get("n_tts")]
        print(f"{len(out)} runs, {len(bad)} with problems")
        await b.close()
asyncio.run(main())
