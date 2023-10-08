export type IGenericResult<T> = {
  meta: {
    page: number;
    size: number;
    total: number;
    totalPage: number;
  };
  data: T;
};
