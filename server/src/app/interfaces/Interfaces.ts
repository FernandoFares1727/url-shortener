export interface ILink {
    id: string;
    originalUrl: string;
    shortUrl: string;
    accessCount: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface ICreateLink {
    originalUrl: string;
    shortUrl: string;
  }

  export interface IRedirectLink {
    originalUrl: string;
    acessCount: number;
  }
  
  export interface ILinkCSV {
    originalUrl: string;
    shortUrl: string;
    accessCount: number;
    createdAt: string;
  }