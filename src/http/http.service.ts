import { IPhotoStatusResponse } from '../bot/bot.interface';

import httpRepository from './http.repository';

const getPhotoStatus = async (endpoint: string): Promise<IPhotoStatusResponse> => {
  try {
    const response = await httpRepository.get<IPhotoStatusResponse>(endpoint);

    return response;
  } catch (error) {
    console.error(`error encountered when getting photo status ${error}`, error);
    throw error;
  }
};

const getPhoto = async (endpoint: string): Promise<Buffer> => {
  try {
    const response = await httpRepository.getBuffer(endpoint);

    return response;
  } catch (error) {
    console.error(`error encountered when getting buffer ${error}`, error);
    throw error;
  }
};

export default { getPhoto, getPhotoStatus };
