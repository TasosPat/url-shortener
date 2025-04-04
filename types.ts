export interface UrlEntry {
    original_url: string;
    short_url: string;
    created_at: Date;
  }

export interface CustomError {
    status: number;
    msg: string;
  }
  