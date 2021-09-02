import axios, { AxiosInstance, AxiosRequestConfig, ResponseType } from 'axios';

import { basePathPhotoApi } from '../bot/bot.constant';

const constructClient = (responseType: ResponseType = 'json'): AxiosInstance => {
  const config: AxiosRequestConfig = {
    baseURL: basePathPhotoApi,
    headers: {
      'Content-Type': 'application/json',
    },
    responseType,
  };

  return axios.create(config);
};

const get = async <T>(endpoint: string): Promise<T> => {
  const client = constructClient();
  return (await client.get(endpoint)).data;
};

const getBuffer = async (endpoint: string): Promise<Buffer> => {
  const client = constructClient('arraybuffer');
  return await (await client.get(endpoint)).data as Buffer;
};

export default { get, getBuffer };
