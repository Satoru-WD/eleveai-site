import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');

async function convertImages() {
    const files = fs.readdirSync(publicDir);
    const pngFiles = files.filter(file => file.endsWith('.png') && file !== 'favicon.png');

    for (const file of pngFiles) {
        const inputPath = path.join(publicDir, file);
        const outputPath = path.join(publicDir, file.replace('.png', '.webp'));

        try {
            await sharp(inputPath)
                .webp({ quality: 80 })
                .toFile(outputPath);
            console.log(`Converted ${file} to WebP.`);
        } catch (err) {
            console.error(`Error converting ${file}:`, err);
        }
    }
}

convertImages();
