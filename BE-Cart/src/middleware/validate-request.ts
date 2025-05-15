import { Request, Response, NextFunction } from 'express';
import { FieldValidationError, ValidationError, validationResult } from 'express-validator';

/**
 * Middleware to handle express-validator validation errors.
 */
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) : void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({
        errors: errors.array().map((error) => {
        const err = error as FieldValidationError;
        return {
          field: err.path,
          message: err.msg,
          location: err.location,
          value: err.value,
        };
      }),
    });
    return; // ensure function exits after sending a response
  }
  next();
};
