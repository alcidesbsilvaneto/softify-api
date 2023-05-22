import { Router } from 'express';
import { AuthRoutes } from './modules/auth/auth.routes';
import { UserRoutes } from './modules/user/user.routes';
import { ArtistRoutes } from './modules/artist/artist.routes';

export const AppRoutes = (): Router => {
  const router = Router();

  router.use('/users', UserRoutes());
  router.use('/auth', AuthRoutes());
  router.use('/artists', ArtistRoutes());

  return router;
};
