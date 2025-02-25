import { Certificate } from '../types/Certificate';
import certificatesJson from './certificates.json';

// 將JSON資料轉換為Certificate型別
const certificateData: Certificate[] = certificatesJson.certificates;

// 排序邏輯
certificateData.sort((a, b) => {
  if (b.value === a.value) {
    return new Date(b.obtainedAt).getTime() - new Date(a.obtainedAt).getTime();
  }
  return b.value - a.value;
});

export default certificateData;