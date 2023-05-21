import { Router } from 'express';
import authController from './auth.controller';
import authValidator from './auth.validator';

export const AuthRoutes = (): Router => {
  const router = Router();

  router.post(
    '/authenticate',
    authValidator.validateAuthenticateRequest,
    authController.handleAuthenticateRequest,
  );

  return router;
};
