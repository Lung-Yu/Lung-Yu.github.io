/**
 * App data interface - defines the structure of app-related data
 * This ensures consistent data structure across languages
 */
export interface AppData {
  app: {
    sections: {
      home: string;
      skills: string;
      projects: string;
      consulting: string;
      certificates: string;
      [key: string]: string;
    };
    navigation: {
      backToTop: string;
      loading: string;
      [key: string]: string;
    };
    meta: {
      imageAlt: string;
      [key: string]: string;
    };
    [key: string]: any;
  };
  [key: string]: any;
}
