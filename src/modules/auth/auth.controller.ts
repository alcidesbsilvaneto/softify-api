import { AppDataSource } from '@/common/database/data-source';
import { Request, Response } from 'express';
import { User } from '../user/user.model';
import bcrypt from "bcrypt";

class AuthController {
  async handleAuthenticateRequest(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await AppDataSource.getRepository(User).findOne({
        where: { email },
      });
      if (!user) throw new Error('User not found');
      const passwordMatch = await bcrypt.compare(password, user.password_hash); // Compare the received password with the hashed password
      if(!passwordMatch) return res.status(401).json({ message: 'invalid-password' })
      return res.json({ message: 'logged-in' });
    } catch (e) {
      return res.status(400).json({ message: 'User not found' });
    }
  }
}

export default new AuthController();
