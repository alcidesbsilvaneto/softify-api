import { AppDataSource } from '@/common/database/data-source';
import { Request, Response } from 'express';
import { User } from '../user/user.model';

class AuthController {
  async handleAuthenticateRequest(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await AppDataSource.getRepository(User).findOne({
        where: { email, password_hash: password },
      });
      if (!user) throw new Error('User not found');
      return res.json({ message: 'logged-in' });
    } catch (e) {
      return res.status(400).json({ message: 'User not found' });
    }
  }
}

export default new AuthController();
