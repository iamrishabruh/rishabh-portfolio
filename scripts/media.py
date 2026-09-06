"""Generate browser-ready media without changing originals or publishing raw EXIF.
Requires Python 3.10+, Pillow, and pillow-heif for HEIC/HEIF inputs.
"""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
from urllib.parse import quote
import hashlib
import json
import re
import shutil

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'src' / 'content'
OUT = ROOT / '.generated' / 'public' / 'media'
META = json.loads((ROOT / 'site' / 'media-metadata.json').read_text())
BASELINE = json.loads((ROOT / 'site' / 'baseline.json').read_text())
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif', '.gif'}
AUDIO_EXTENSIONS = {'.mp3', '.m4a', '.wav', '.ogg'}


def prepare():
    for group, names in [('photos', BASELINE['photos']), ('music', BASELINE['tracks'])]:
        for name in names:
            if not (SOURCE / group / name).is_file():
                raise FileNotFoundError(f'Original missing: src/content/{group}/{name}')
    for name in BASELINE['documents']:
        if not (ROOT / 'public' / 'documents' / name).is_file():
            raise FileNotFoundError(f'Original document missing: {name}')
    if not (SOURCE / 'portrait.jpg').is_file():
        raise FileNotFoundError('The existing portrait.jpg is required.')
    photos = sorted((SOURCE / 'photos').iterdir(), key=lambda p: (p.name.casefold(), p.name))
    if any(p.suffix.lower() in {'.heic', '.heif'} for p in photos):
        import pillow_heif
        pillow_heif.register_heif_opener()
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)
    return photos


def derivative(path, group, index=0):
    digest = hashlib.sha256(path.read_bytes()).hexdigest()
    slug = re.sub(r'[^a-z0-9]+', '-', path.name.lower()).strip('-') + '-' + digest[:10]
    folder = OUT / group
    folder.mkdir(exist_ok=True)
    metadata = META.get(path.name, {})
    try:
        with Image.open(path) as original_image:
            normalized = ImageOps.exif_transpose(original_image).convert('RGB')
            width, height = normalized.size
            # A fresh pixel-only image drops source metadata including EXIF/GPS.
            image = Image.new('RGB', normalized.size)
            image.paste(normalized)
            renditions = []
            for target in sorted({min(width, n) for n in (480, 960, 1440)}):
                resized = image.resize((target, max(1, round(height * target / width))), Image.Resampling.LANCZOS)
                filename = f'{slug}-{target}.webp'
                resized.save(folder / filename, 'WEBP', quality=82, method=6)
                renditions.append((target, f'/media/{group}/{filename}'))
    except Exception as exc:
        raise RuntimeError(f'Could not convert {path.name}; this asset has not been silently omitted.') from exc
    best = min(renditions, key=lambda r: abs(r[0] - 960))
    return {'name': path.name, 'source': path.relative_to(ROOT).as_posix(), 'sha256': digest,
            'src': best[1], 'srcset': ', '.join(f'{url} {w}w' for w, url in renditions),
            'full': renditions[-1][1], 'original': path.relative_to(ROOT).as_posix(),
            'width': width, 'height': height,
            'alt': metadata.get('alt', f'Personal photograph from Rishabh’s collection, image {index + 1}'),
            'caption': metadata.get('caption', ''), 'needsDescription': 'alt' not in metadata}


def social_image():
    image = Image.new('RGB', (1200, 630), '#f7f6f2')
    draw = ImageDraw.Draw(image)
    display = ImageFont.load_default(size=86)
    body = ImageFont.load_default(size=25)
    small = ImageFont.load_default(size=17)
    draw.text((68, 64), 'ENGINEER. RESEARCHER. HUMAN.', font=small, fill='#59615b')
    draw.text((62, 154), 'Rishabh', font=display, fill='#202824')
    draw.text((62, 255), 'Chouhan.', font=display, fill='#202824')
    draw.text((68, 420), 'AI systems for real-world complexity.', font=body, fill='#294ec8')
    draw.line((68, 535, 1132, 535), fill='#d8dad2', width=2)
    draw.text((68, 561), 'Healthcare / Operations / Research / A little music', font=small, fill='#59615b')
    with Image.open(SOURCE / 'portrait.jpg') as source:
        portrait = ImageOps.fit(ImageOps.exif_transpose(source).convert('RGB'), (320, 365))
        image.paste(portrait, (812, 125))
    image.save(OUT / 'social-preview.png', optimize=True)


def main():
    photos = prepare()
    manifest = {'portrait': derivative(SOURCE / 'portrait.jpg', 'portrait'), 'photos': [], 'tracks': [], 'documents': {}}
    for path in photos:
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS:
            manifest['photos'].append(derivative(path, 'photos', len(manifest['photos'])))
        elif path.is_file() and path.name not in {'.gitkeep', '.DS_Store'} and path.suffix.lower() not in {'.md', '.txt'}:
            raise ValueError(f'Unsupported photo asset: {path.name}. Add an explicit conversion instead of dropping it.')
    for path in sorted((SOURCE / 'music').iterdir(), key=lambda p: (p.name.casefold(), p.name)):
        if not path.is_file():
            continue
        if path.suffix.lower() not in AUDIO_EXTENSIONS:
            if path.name not in {'.gitkeep', '.DS_Store'} and path.suffix.lower() not in {'.md', '.txt'}:
                raise ValueError(f'Unsupported audio asset: {path.name}')
            continue
        target = OUT / 'music' / path.name
        target.parent.mkdir(exist_ok=True)
        shutil.copy2(path, target)
        title = re.sub(r'^\d+[-_ ]*', '', path.stem).replace('_', ' ').strip() or 'Untitled'
        manifest['tracks'].append({'name': path.name, 'title': title, 'src': '/media/music/' + quote(path.name), 'sha256': hashlib.sha256(path.read_bytes()).hexdigest()})
    for path in (ROOT / 'public' / 'documents').glob('*'):
        if path.is_file() and path.suffix.lower() == '.pdf':
            manifest['documents']['/documents/' + path.name] = path.stat().st_size
    social_image()
    (ROOT / '.generated' / 'media.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n')
    print(f'Media: {len(manifest["photos"])} photo variants, {len(manifest["tracks"])} tracks, {len(manifest["documents"])} PDFs. Original photo files remain unchanged in Git.')


if __name__ == '__main__':
    main()
