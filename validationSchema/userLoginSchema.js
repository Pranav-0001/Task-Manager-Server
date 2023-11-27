import { body } from "express-validator";

export const userLoginValidationSchema = [
  body("email")
    .ltrim()
    .rtrim()
    .notEmpty()
    .withMessage("Email field is missing")
    .isString()
    .withMessage("Email should be a string"),
  body("password")
    .notEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 8 })
    .withMessage("Password should have 8 letters"),
];