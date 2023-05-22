import { NextFunction, Request, Response } from 'express';

class ArtistValidator {
  async validateCreateArtistRequest(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .send({ ok: false, message: 'missing-name', userMessage: 'Nome obrigatório' });
    }

    next();
  }
}

export default new ArtistValidator();
