import constructClient from './http.client';

const get = async <T>(endpoint: string): Promise<T> => {
  const client = constructClient();
  return (await client.get(endpoint)).data;
};

const getBuffer = async (endpoint: string): Promise<Buffer> => {
  const client = constructClient('arraybuffer');
  return await (await client.get(endpoint)).data as Buffer;
};

export default { get, getBuffer };
