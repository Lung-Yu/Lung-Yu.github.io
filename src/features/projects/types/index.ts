export interface Project {
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
    startDate: string; // 新增開始日期屬性
    endDate: string; // 新增結束日期屬性
}