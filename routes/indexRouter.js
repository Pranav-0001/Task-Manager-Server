import express from "express";
import {
  userRegisterValidationSchema,
  userLoginValidationSchema,
} from "../validationSchema/index.js";
import { validateRequest } from "../helpers/validateRequest.js";
import { getUserById, loginUser, registerUser } from "../controller/userController.js";
import { validateToken } from "../helpers/validateToken.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ log: "Test" });
});
router.post(
  "/signup",
  userRegisterValidationSchema,
  validateRequest,
  registerUser
);
router.post("/login", userLoginValidationSchema, validateRequest, loginUser);
router.get("/getuserbyid/:id",validateToken,getUserById)

export default router;
