import { token } from '../common/common.constant';

export const basePathPhotoApi = 'https://api.telegram.org';
export const getPhotoStatusApi = `/bot${token}/getFile?file_id={fileId}`;
export const getPhotoApi = `/file/bot${token}/{filePath}`;
