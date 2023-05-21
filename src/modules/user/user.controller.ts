import { AppDataSource } from '@/common/database/data-source';
import { Request, Response } from 'express';
import { User } from './user.model';
import bcrypt from "bcrypt";

class UserController {
  async handleCreateRequest(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10); // Hash the password with bcrypt
    try {
      const user = await AppDataSource.getRepository(User).save({
        name,
        email,
        password_hash: passwordHash,
      });
      return res.send({ ok: true, user: { id: user.id, name: user.name } });
    } catch (error) {
      console.log(error, 'error creating user');
    }
  }
}

export default new UserController();

