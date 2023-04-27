import express from 'express';
import { UserController } from '#controllers/index.js';
import { checkAuth, handleValidationErrors } from '#utils/index.js';
import { registerValidation, loginValidation } from '#validations/index.js';

const authRouter = express.Router();

authRouter.get('/me', checkAuth, UserController.getMe);
authRouter.post(
  '/login',
  loginValidation,
  handleValidationErrors,
  UserController.login
);
authRouter.post(
  '/register',
  registerValidation,
  handleValidationErrors,
  UserController.register
);

export default authRouter;
