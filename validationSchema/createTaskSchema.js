import { body } from "express-validator";

export const createTaskValidationSchema = [
    body("title").notEmpty().withMessage("Title cannot be empty").isString().withMessage("Title should be a string"),
    body("description").notEmpty().withMessage("Description cannot be empty").isString().withMessage("Description should be a string"),
    body("createdBy").notEmpty().withMessage("CreatedBy cannot be empty"),
    body("status").optional(),
]