import { Router } from 'express';
import {AuthRoutes} from './modules/auth/auth.routes';
import { UserRoutes } from './modules/user/user.routes';

export const AppRoutes = (): Router => {
  const router = Router();

  router.use('/users', UserRoutes());
  router.use('/auth', AuthRoutes());

  return router;
};
