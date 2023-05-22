import { AppDataSource } from '@/common/database/data-source';
import { Request, Response } from 'express';
import { User } from '../user/user.model';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  async handleAuthenticateRequest(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await AppDataSource.getRepository(User).findOne({
        where: { email },
      });
       if(!user) return res.status(401).json({ message: 'invalid-email' });
      const passwordMatch = await bcrypt.compare(password, user.password_hash); 
      if(!passwordMatch) return res.status(401).json({ message: 'invalid-password' })
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ jwt_token: token, user_name: user.name });
    } catch (e) {
      return res.status(400).json({ message: 'User not found' });
    }
  }
}

export default new AuthController();
