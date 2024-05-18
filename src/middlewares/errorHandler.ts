import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/customError";

class ErrorHandler {
  public handleError = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware error handling!")
    err.statusCode = err.statusCode ?? 500
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      status: err.status,
      message: err.message
    })
  }
}

export default ErrorHandler