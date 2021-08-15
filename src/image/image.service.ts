import fs from 'fs';

import Sharp from 'sharp';

import imageConstants from './image.constants';
import { WATERMARK_GRAVITY } from './image.enum';

async function processImage(imageLocation: Buffer): Promise<void> {
  const image = Sharp(imageLocation);

  const textWatermark = Buffer.from(
    imageConstants.WATERMARK_SVG.replace('{watermarkText}', 'Daftar Bank Jago 20210814'),
  );

  image.composite([{ input: textWatermark, gravity: WATERMARK_GRAVITY.SOUTH }]);
  const imgBuffer = await image.toBuffer();
  fs.writeFileSync('output.jpg', imgBuffer);

  console.info('done');
}

export default { processImage };
