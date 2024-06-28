export class UrlConfig {
    post?: {
      url: string;
      params?: Record<string, any>; // Assuming parameters are key-value pairs
    };
    get?: {
      url: string;
      params?: Record<string, any>;
    };
    put?: {
      url: string;
      params?: Record<string, any>;
    };
    delete?: {
      url: string;
      params?: Record<string, any>;
    };
  }