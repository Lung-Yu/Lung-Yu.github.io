interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string; // 改為選填
  demo?: string;  // 改為選填
  detailPath: string; // 新增詳細頁面路徑
  gallery?: string[]; // 新增圖片集
  videos?: string[]; // 新增影片集
}

const projects: Project[] = [
  {
    id: 1,
    title: "天氣種子",
    description: "近年來綠色永續議題抬頭，本團隊認為空氣品質是重要的議題。透過感測器取得環境數據，並透過視覺化方式呈現。",
    image: "/src/assets/images/projects/11_weather_seed/prototype.jpg",
    tags: ["IoT", "Arduino", "環境監測"],
    detailPath: "weather-seed",
    gallery: [
      "/src/assets/images/projects/11_weather_seed/egg_print.jpg",
      "/src/assets/images/projects/11_weather_seed/box.jpg",
      "/src/assets/images/projects/11_weather_seed/prototype.jpg",
    ]
  },
  {
    id: 2,
    title: "Samsung TV 拍拍樂",
    description: "在 Samsung Smart TV 上開發的應用程式，讓使用者能夠輕鬆擷取電視節目畫面並進行拼圖效果。",
    image: "/src/assets/images/projects/6_samsung_app/cover.jpg",
    tags: ["Smart TV", "Samsung", "互動設計"],
    detailPath: "samsung-tv-app"
  },
  // ... 其他專案
];

export { projects };
export type { Project };
