import certificatesJson from './certificates.json';

export interface Certificate {
  title: string;
  institution: string; 
  category: string;
  image: string;
  description: string;
  fullName: string;
  abbreviation: string;
  obtainedAt: string;
  expiryDate?: string;
  value: number;
}

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