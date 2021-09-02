import Sharp from 'sharp';

import imageConstants from './image.constants';
import { WATERMARK_GRAVITY } from './image.enum';

async function processImage(imageLocation: Buffer, watermarkText: string): Promise<Buffer> {
  console.time('image processing execution time');
  const image = Sharp(imageLocation);

  const textWatermark = Buffer.from(
    imageConstants.WATERMARK_SVG.replace('{watermarkText}', watermarkText),
  );

  image.composite([{ input: textWatermark, gravity: WATERMARK_GRAVITY.SOUTHEAST }]);
  const imgBuffer = await image.toBuffer();

  console.info('done');
  console.timeEnd('image processing execution time');

  return imgBuffer;
}

export default { processImage };
