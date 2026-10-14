const sharp = require('sharp');
const path = require('path');

async function processAssets() {
  const mockupPath = path.join(__dirname, '../Nyokolodi Transit Responsive Website Mockup.png');
  const publicDir = path.join(__dirname, '../public');

  // 1. Hero Cars & Mountains (shift right to 572 to be completely free of leftover text)
  await sharp(mockupPath)
    .extract({ left: 572, top: 75, width: 592, height: 420 })
    .toFile(path.join(publicDir, 'hero-cars.png'));
  console.log('Updated hero-cars.png');

  // 2. Trusted Partner Car (Dzire parked at building, trim bottom so "OUR FLEET" is cut off)
  await sharp(mockupPath)
    .extract({ left: 88, top: 650, width: 470, height: 198 })
    .toFile(path.join(publicDir, 'trusted-partner-car.png'));
  console.log('Updated trusted-partner-car.png');

  // 3. Trim logo.png
  const logoPath = path.join(__dirname, '../logo.png');
  await sharp(logoPath)
    .trim()
    .toFile(path.join(publicDir, 'logo-trimmed.png'));
  console.log('Updated logo-trimmed.png');
}

processAssets().catch(err => console.error(err));
