import express from "express";
import { validateToken } from "../helpers/validateToken.js";
import {
  createTaskValidationSchema,
  getTaskByStatusSchema,
  updateTaskValidationSchema,
  getAllTasksSchema
} from "../validationSchema/index.js";
import { validateRequest } from "../helpers/validateRequest.js";
import {
  createTask,
  deleteTaskById,
  getAllTasks,
  getTasksByStatus,
  updateTaskById,
} from "../controller/taskController.js";


const router = express.Router();

router.post(
  "/create",
  validateToken,
  createTaskValidationSchema,
  validateRequest,
  createTask
);
router.get(
  "/getalltasks",
  validateToken,
  getAllTasksSchema,
  validateRequest,
  getAllTasks
);
router.put(
  "/updateTaskById/:id",
  validateToken,
  updateTaskValidationSchema,
  validateRequest,
  updateTaskById
);
router.delete(
  "/deletebyid/:id",
  validateToken,
  updateTaskValidationSchema,
  validateRequest,
  deleteTaskById
);

router.get(
  "/gettaskbystatus",
  validateToken,
  getTaskByStatusSchema,
  validateRequest,
  getTasksByStatus
);

export default router;
