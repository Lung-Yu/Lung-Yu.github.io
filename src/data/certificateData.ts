export interface Certificate {
  category: string;
  title: string;
  image: string;
  description: string;
}

const certificateData: Certificate[] = [];

for (let i = 1; i <= 50; i++) {
  certificateData.push({
    title: `Certificate ${i}`,
    category: i % 2 === 0 ? 'Even' : 'Odd',
    image: '/src/assets/images/default-images.jpg',
    description: `Description of certificate ${i}`,
  });
}

export default certificateData;
