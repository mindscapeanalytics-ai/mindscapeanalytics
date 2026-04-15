import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = 'c:/Users/zaliz/Downloads/mindscapeanalytics-main/public/images/team/zeeshan-keerio.png';
const outputPath = 'c:/Users/zaliz/Downloads/mindscapeanalytics-main/public/images/team/zeeshan-keerio.webp';

async function convert() {
  try {
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
    console.log('Conversion successful: ' + outputPath);
  } catch (error) {
    console.error('Conversion failed:', error);
  }
}

convert();
