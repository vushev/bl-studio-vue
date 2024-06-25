export interface ValidationError {
    message: string;
    keys: string[];
  }
  
  export interface ApiResponse<T> {
    statusCode: number;
    message: string;
    data?: T;
    error?: string;
    validation?: ValidationError;
  }