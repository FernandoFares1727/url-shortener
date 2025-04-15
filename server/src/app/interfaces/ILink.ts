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

  export interface IIncrementLink {
    shortUrl: string;
  }
  
  export interface ILinkCSV {
    originalUrl: string;
    shortUrl: string;
    accessCount: number;
    createdAt: string;
  }