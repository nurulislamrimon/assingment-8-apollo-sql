import { Response } from "express";

type IGenericApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    size: number;
    total: number;
    totalPage: number;
  };
  token?: string | null;
  data?: T | null;
};
const sendResponse = <T>(res: Response, data: IGenericApiResponse<T>) => {
  const responseData: IGenericApiResponse<T> = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message || null,
    meta: data.meta || null || undefined,
    token: data.token || null || undefined,
    data: data.data || null || undefined,
  };
  res.status(data.statusCode).send(responseData);
};

export default sendResponse;
