import { getPhotoApi, getPhotoStatusApi } from '../bot/bot.constant';
import { IPhotoStatusResponse } from '../bot/bot.interface';

import httpRepository from './http.repository';

const getPhotoStatus = async (fileId: string): Promise<IPhotoStatusResponse> => {
  const endpoint = getPhotoStatusApi.replace('{fileId}', fileId);

  try {
    const response = await httpRepository.get<IPhotoStatusResponse>(endpoint);

    return response;
  } catch (error) {
    console.error(`error encountered when getting photo status ${error}`, error);
    throw error;
  }
};

const getPhoto = async (photoPath: string): Promise<Buffer> => {
  const endpoint = getPhotoApi.replace('{filePath}', photoPath);
  try {
    const response = await httpRepository.getBuffer(endpoint);

    return response;
  } catch (error) {
    console.error(`error encountered when getting buffer ${error}`, error);
    throw error;
  }
};

export default { getPhoto, getPhotoStatus };
