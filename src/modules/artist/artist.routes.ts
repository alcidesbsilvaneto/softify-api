import authMiddlewares from '@/modules/auth/auth.middlewares';
import { Router } from 'express';
import artistController from './artist.controller';
import artistValidator from './artist.validator';

export const ArtistRoutes = (): Router => {
  const router = Router();

  router.post(
    '/',
    authMiddlewares.requireJwt,
    artistValidator.validateCreateArtistRequest,
    artistController.handleCreateArtistRequest,
  );

  router.get('/', artistController.handleListArtistsRequest);

  router.patch(
    '/:id',
    authMiddlewares.requireJwt,
    artistController.handleUpdateArtistRequest,
  );

  router.delete(
    '/:id',
    authMiddlewares.requireJwt,
    artistController.handleDeleteArtistRequest,
  );

  return router;
};
