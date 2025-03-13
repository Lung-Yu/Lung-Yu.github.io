import { BUILD_TIME } from '@/config/constants';

const getImageUrl = (url: string) => {
  return `${url}?v=${BUILD_TIME}`;
};

export default getImageUrl;
