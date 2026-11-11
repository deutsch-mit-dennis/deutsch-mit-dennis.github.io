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
    "lehrer": "a male teacher standing in front of a class, explaining",
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
    "zu-fuss": "a person walking on a pavement, going on foot",
    "auge": "a human eye, close-up, friendly",
    "ohr": "a human ear",
    "nase": "a friendly face in profile, the nose highlighted",
    "mund": "a smiling mouth",
    "zahn": "a white tooth, dental illustration",
    "hand": "an open human hand",
    "arm": "a human arm",
    "bein": "a human leg",
    "fuss": "a human foot",
    "bauch": "a person holding their belly",
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
    "koch": "a male cook in a restaurant kitchen",
    "verkaeuferin": "a female shop assistant at a cash register",
    "busfahrer": "a bus driver at the steering wheel of a bus",
    "pflegerin": "a female nurse caring for an elderly person",
    "friseur": "a hairdresser cutting a client's hair",
    "kellnerin": "a waitress serving food in a restaurant",
    "elektriker": "an electrician working on a socket",
    "mechanikerin": "a female car mechanic repairing a car",
    "programmiererin": "a female programmer working at a computer",
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
