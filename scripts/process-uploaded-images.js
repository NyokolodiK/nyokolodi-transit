const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function setupImages() {
  const root = path.join(__dirname, '..');
  const publicDir = path.join(root, 'public');

  // 1. Copy road-wave.svg to public/
  fs.copyFileSync(path.join(root, 'road-wave.svg'), path.join(publicDir, 'road-wave.svg'));
  console.log('Copied road-wave.svg to public');

  // 2. Process fleet-two-dzires.webp
  // Check dimensions and trim any black bar on the right
  const fleetTwoMeta = await sharp(path.join(root, 'fleet-two-dzires.webp')).metadata();
  console.log('fleet-two-dzires:', fleetTwoMeta.width, 'x', fleetTwoMeta.height);

  // In fleet-two-dzires.webp, there's a black bar on the right. Let's crop it to width 1530:
  await sharp(path.join(root, 'fleet-two-dzires.webp'))
    .extract({ left: 0, top: 0, width: 1530, height: fleetTwoMeta.height })
    .toFile(path.join(publicDir, 'fleet-two-dzires-clean.webp'));
  console.log('Created fleet-two-dzires-clean.webp');

  // Also make a standard png version for broad compatibility
  await sharp(path.join(publicDir, 'fleet-two-dzires-clean.webp'))
    .toFile(path.join(publicDir, 'hero-cars-hires.png'));
  console.log('Created hero-cars-hires.png');

  // 3. Process docs_ai_concept.png if available
  const conceptPath = path.join(root, 'docs_ai_concept.png');
  if (fs.existsSync(conceptPath)) {
    const meta = await sharp(conceptPath).metadata();
    console.log('docs_ai_concept:', meta.width, 'x', meta.height);

    // Driver polo uniforms: left: 780, top: 720, width: 660, height: 360
    await sharp(conceptPath)
      .extract({ left: 775, top: 725, width: 670, height: 355 })
      .toFile(path.join(publicDir, 'driver-uniforms.png'));
    console.log('Created driver-uniforms.png');

    // Car door branding close-up:
    await sharp(conceptPath)
      .extract({ left: 0, top: 725, width: 445, height: 355 })
      .toFile(path.join(publicDir, 'branding-door.png'));
    console.log('Created branding-door.png');

    // Full Dzire fleet with Table Mountain from concept:
    await sharp(conceptPath)
      .extract({ left: 0, top: 370, width: 1448, height: 355 })
      .toFile(path.join(publicDir, 'hero-fleet-full.png'));
    console.log('Created hero-fleet-full.png');
  }

  // 4. Ensure logo-transparent.png and logo.png are in public
  if (fs.existsSync(path.join(root, 'logo-transparent.png'))) {
    fs.copyFileSync(path.join(root, 'logo-transparent.png'), path.join(publicDir, 'logo-transparent.png'));
  }
}

setupImages().catch(console.error);
