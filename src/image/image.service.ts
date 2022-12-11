import Sharp from 'sharp';

import httpService from '../http/http.service';

import imageConstants from './image.constants';
import { WATERMARK_GRAVITY } from './image.enum';

async function getAndProcessImage(fileId: string, watermarkText: string): Promise<Buffer> {
  const photoStatusResponse = await httpService.getPhotoStatus(fileId);
  const photoPath = photoStatusResponse.result.file_path;

  const imageBuffer = await httpService.getPhoto(photoPath);

  console.time('image processing execution time');
  const image = Sharp(imageBuffer);
  const imageMetadata = await image.metadata();
  const width = imageMetadata.width ? imageMetadata.width * (1 / 3) : 300;

  const textWatermark = Buffer.from(
    imageConstants.WATERMARK_SVG.replace('{watermarkText}', watermarkText).replace('{watermarkWidth}', width.toString())
  );

  image.composite([{ input: textWatermark, gravity: WATERMARK_GRAVITY.SOUTHEAST }]);
  const imgBuffer = await image.toBuffer();

  console.info('done');
  console.timeEnd('image processing execution time');

  return imgBuffer;
}

export default { getAndProcessImage };
