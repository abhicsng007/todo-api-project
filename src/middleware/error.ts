import { Request, Response, NextFunction } from 'express';

interface ErrorResponse {
  message: string;
  status?: number;
  stack?: string;
}

export function errorHandler(
  err: Error & { status?: number },
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const statusCode = err.status || 500;
  const response: ErrorResponse = {
    message: err.message,
  };

  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}