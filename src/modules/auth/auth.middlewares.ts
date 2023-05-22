import { AppDataSource } from '@/common/database/data-source';
import { NextFunction, Request, Response } from 'express';
import { User } from '../user/user.model';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: number;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

class AuthMiddlewares {
  async requireJwt(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ ok: false, message: 'no-token-provided' });
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2) return res.status(401).json({ message: 'invalid-token' });
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme))
      return res.status(401).json({ message: 'invalid-token' });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload; // Verify the JWT token
      const user = await AppDataSource.getRepository(User).findOne({
        where: { id: decoded.userId },
      });
      if (!user) return res.status(401).json({ message: 'user-not-found' });
      req.user = user;
      return next();
    } catch (e) {
      return res.status(401).json({ message: 'invalid-token' });
    }
  }
}

export default new AuthMiddlewares();
