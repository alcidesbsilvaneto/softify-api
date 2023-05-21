import { Router } from 'express';
import userController from './user.controller';
import userValidator from './user.validator';

export const UserRoutes = (): Router => {
  const router = Router();

  // POST /users/
  router.post('/', userValidator.validateCreateUserRequest, userController.handleCreateRequest);

  return router;
};

