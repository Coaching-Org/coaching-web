export interface MetaPaginationResponse {
  page: number;
  perPage: number;
  total: number;
  totalPage: number;
}

export interface ParamsPaginationRequest {
  page?: number;
  perPage?: number;
  keyword?: string;
  sort?: string;
  sortBy?: string;
}
