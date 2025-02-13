export interface Certificate {
  title: string;
  image: string;
  description: string;
}

const certificateData: Certificate[] = [];

for (let i = 1; i <= 50; i++) {
  certificateData.push({
    title: `Certificate ${i}`,
    image: '/src/assets/images/default-images.jpg',
    description: `Description of certificate ${i}`,
  });
}

export default certificateData;
