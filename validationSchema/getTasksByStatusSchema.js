import { query } from "express-validator";

export const getTaskByStatusSchema = [
    query("status").notEmpty().withMessage("Status field is missing"),
    query("page").notEmpty().withMessage("page field is missing"),
    query("limit").notEmpty().withMessage("limit field is missing"),
];
