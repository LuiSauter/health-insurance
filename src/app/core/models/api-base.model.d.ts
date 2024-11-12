interface ApiBase {
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  statusCode: number,
  message?: string,
  error?: string,
  data?: T;
  countData?: number;
}