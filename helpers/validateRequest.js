import { validationResult } from "express-validator";


const validateRequest = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) next();
  else res.status(400).json({res:result.array()});
};

export { validateRequest };