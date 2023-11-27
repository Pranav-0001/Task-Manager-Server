import { query } from "express-validator";

export const getAllTasksSchema=[
    query("page").notEmpty().withMessage("page is missing"),
    query("limit").notEmpty().withMessage("limit is missing")
]
