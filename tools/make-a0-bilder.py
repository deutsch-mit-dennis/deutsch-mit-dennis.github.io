"""Pictures for "Erste Schritte" (erste-schritte-data.js) -> assets/a0/<slug>.webp with Gemini (same style as make-wortbilder.py).
Existing files are skipped (the greetings come from Canva). Cost: about 0.04 $ per picture.
Usage: python tools/make-a0-bilder.py [--only zug,auto] [--redo zug]"""

import importlib.util, io, os, sys, time, urllib.error
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
spec = importlib.util.spec_from_file_location(
    "wb", os.path.join(ROOT, "tools", "make-wortbilder.py")
)
wb = importlib.util.module_from_spec(spec)
spec.loader.exec_module(wb)
OUT = os.path.join(ROOT, "assets", "a0")

PICS = {
    "bleistift": "a single yellow pencil",
    "tafel": "a green school chalkboard on a classroom wall, blank",
    "handy": "a smartphone",
    "tasche": "a school bag / backpack",
    "radiergummi": "an eraser",
    "lehrer": "a male teacher in his forties stands at a blank whiteboard and explains something with an open hand to a class of adult learners of different ages",
    "baby": "a baby sitting on a blanket",
    "wasser": "a glass of water and a water bottle",
    "kaffee": "a cup of coffee",
    "tee": "a cup of tea with a tea bag",
    "banane": "a banana",
    "kaese": "a piece of cheese",
    "ei": "an egg",
    "reis": "a bowl of rice",
    "kartoffel": "potatoes",
    "tomate": "a tomato",
    "t-shirt": "a plain T-shirt",
    "rock": "a skirt",
    "muetze": "a knitted winter hat",
    "schal": "a scarf",
    "sonne": "bright sun in a blue sky, sunny weather",
    "regen": "rain falling from grey clouds, an umbrella",
    "schnee": "snow falling on a snowy landscape",
    "wind": "windy weather, trees bending, leaves blowing",
    "wolke": "a cloudy sky with grey clouds",
    "gewitter": "a thunderstorm with lightning",
    "fruehling": "spring: blooming flowers and a blossoming tree",
    "sommer": "summer: a sunny meadow on a hot day",
    "herbst": "autumn: colourful falling leaves",
    "winter": "winter: a snowy landscape with a snowman",
    "supermarkt": "a supermarket building with shopping carts in front",
    "bank": "a bank building with an ATM",
    "post": "a post office counter with parcels and letters",
    "krankenhaus": "a hospital building with an ambulance",
    "baeckerei": "a bakery shop window with bread and pastries",
    "rathaus": "a traditional German town hall building",
    "zug": "a regional train at a station platform",
    "strassenbahn": "a tram on city rails",
    "u-bahn": "an underground train in a metro station",
    "auto": "a small family car",
    "fahrrad": "a bicycle",
    "taxi": "a taxi car",
    "flugzeug": "an airplane in the sky",
    "zu-fuss": "an older woman in a coat and comfortable shoes walks briskly along a city pavement mid-stride, a cloth shopping bag in her hand, houses and a zebra crossing behind her",
    "auge": "a human eye, close-up, friendly",
    "ohr": "a human ear",
    "nase": "a friendly face in profile, the nose highlighted",
    "mund": "a smiling mouth",
    "zahn": "a white tooth, dental illustration",
    "hand": "an open human hand",
    "arm": "a human arm",
    "bein": "a human leg",
    "fuss": "a human foot",
    "bauch": "a man in his forties in a plain sweater sits upright on a sofa with both hands resting on his belly over his clothes, mild stomach-ache expression without exaggeration, a cup of tea on the table beside him",
    "bett": "a bed",
    "sofa": "a sofa",
    "schrank": "a wardrobe",
    "lampe": "a table lamp",
    "kuehlschrank": "a refrigerator",
    "herd": "a kitchen stove",
    "waschmaschine": "a washing machine",
    "dusche": "a shower in a bathroom",
    "fenster": "a window",
    "tuer": "a door",
    "koch": "a woman cook in her forties with dark skin, her hair under a small white cook's cap, in a white chef's jacket and apron, stirring a big pot on the stove of a restaurant kitchen with pans and ladles around her",
    "verkaeuferin": "a young man with a short beard in a plain polo shirt without logo sits at a supermarket checkout and scans groceries from the conveyor belt, friendly and focused",
    "busfahrer": "a sturdy woman in her fifties with short grey hair and a plain uniform shirt sits at the big steering wheel of a modern city bus, seen from the open front door, calm and confident",
    "pflegerin": "a male nurse in his thirties with a beard, in light blue scrubs, walks slowly beside an elderly woman with a walking frame along a bright care-home corridor, both chatting and smiling",
    "friseur": "a young man in a black hairdresser's apron cuts an older woman's hair with scissors and comb while she sits in a salon chair with a cape in front of a mirror",
    "kellnerin": "a waitress in her fifties with a fuller figure, black shirt and long apron carries two plates of food to a table in a cosy neighbourhood restaurant",
    "elektriker": "an electrician in his late fifties with light brown skin and grey stubble, in grey work clothes with a tool belt, kneels at an open German wall socket in a flat and checks it with a voltage tester",
    "mechanikerin": "a young woman car mechanic with red hair in a ponytail, in dark blue work overalls with a few oil stains, leans under the open bonnet of a car in a workshop holding a wrench",
    "programmiererin": "a woman in her thirties wearing a headscarf and a cardigan sits at a desk in a bright office and types on a keyboard, two monitors showing abstract coloured code blocks with no readable text",
}


def main():
    arg = lambda n: (
        set(sys.argv[sys.argv.index(n) + 1].split(",")) if n in sys.argv else set()
    )
    only, redo, k = arg("--only"), arg("--redo"), wb.key()
    todo = [
        s
        for s in PICS
        if (not only or s in only)
        and (s in redo or not os.path.exists(os.path.join(OUT, s + ".webp")))
    ]
    print(
        len(todo),
        "Bilder zu erzeugen, ca.",
        round(len(todo) * 0.04, 2),
        "$",
        flush=True,
    )
    for i, s in enumerate(todo, 1):
        text = (
            f"Picture for a German vocabulary flashcard for adult beginners: {PICS[s]}. "
            + wb.STYLE
        )
        for attempt in range(3):
            try:
                png = wb.generate(text, k)
                break
            except (urllib.error.HTTPError, RuntimeError) as e:
                if attempt < 2:
                    time.sleep(20 * (attempt + 1))
                    continue
                print(f"FEHLER {s}: {e}", flush=True)
                png = None
        if png:
            Image.open(io.BytesIO(png)).convert("RGB").resize(
                (256, 256), Image.LANCZOS
            ).save(os.path.join(OUT, s + ".webp"), "WEBP", quality=78, method=6)
            print(f"{i}/{len(todo)} {s}", flush=True)


if __name__ == "__main__":
    main()
