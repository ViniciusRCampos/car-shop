import { NextFunction, Request, Response } from 'express';
import NotFoundError from '../Error/NotFoundError';
import ValidationError from '../Error/ValidationError';

class ErrorHandler {
  public static handle(
    error: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (error instanceof NotFoundError) {
      return res.status(error.status).json({ message: error.message });
    }
    if (error instanceof ValidationError) {
      return res.status(error.status).json({ message: error.message });
    }

    res.status(500).json({ message: error.message });
    next();
  }
}

export default ErrorHandler;
