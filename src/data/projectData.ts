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
    id: 3,
    title: "iWatchMan 網路安全監控系統",
    description: "基於樹莓派開發的網路安全監控系統，主要用於偵測和防禦惡意 DHCP 伺服器攻擊，保護區網安全。",
    image: "/src/assets/images/projects/10_i_watch_man/架構圖.png",
    tags: ["Network Security", "Raspberry Pi", "DHCP Snooping"],
    detailPath: "i-watch-man",
    gallery: [
      "/src/assets/images/projects/10_i_watch_man/架構圖.png",
      "/src/assets/images/projects/10_i_watch_man/DHCP_Spoofing情境說明圖.png",
      "/src/assets/images/projects/10_i_watch_man/操作畫面圖.png",
      "/src/assets/images/projects/10_i_watch_man/系統硬體建置圖.png"
    ]
  },
  {
    id: 4,
    title: "網頁表單自動填寫工具",
    description: "一個能夠自動填寫網頁表單的工具，可以從 Excel 檔案讀取資料，並自動填入指定的網頁表單中，提高資料輸入效率。",
    image: "/src/assets/images/projects/20_Auto-fill_web_form_tool/auto_fill.png",
    tags: ["自動化工具", "網頁爬蟲", "Excel 整合"],
    detailPath: "auto-fill-web-form",
    gallery: [
      "/src/assets/images/projects/20_Auto-fill_web_form_tool/auto_fill.png",
      "/src/assets/images/projects/20_Auto-fill_web_form_tool/auto_fill_2.png",
      "/src/assets/images/projects/20_Auto-fill_web_form_tool/load_data.png",
      "/src/assets/images/projects/20_Auto-fill_web_form_tool/rawdata.png"
    ]
  },
  // ... 其他專案
];

export { projects };
export type { Project };
