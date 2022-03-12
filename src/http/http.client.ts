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

export default constructClient;
