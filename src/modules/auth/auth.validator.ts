import { NextFunction, Request, Response } from 'express';

class AuthValidator {
  async validateAuthenticateRequest(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ message: 'missing-email', userMessage: 'Email não enviado.' });
    }
    if (!password) {
      return res
        .status(400)
        .json({ message: 'missing-password', userMessage: 'Senha não enviada.' });
    }
    return next();
  }
}


export default new AuthValidator();
