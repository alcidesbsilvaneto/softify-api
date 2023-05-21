import { Router } from 'express';
import { UserRoutes } from './modules/user/user.routes';

export const AppRoutes = (): Router => {
  const router = Router();

  router.use('/users', UserRoutes());

  return router;
};
