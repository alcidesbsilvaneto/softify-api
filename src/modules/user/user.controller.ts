import { AppDataSource } from '@/common/database/data-source';
import { Request, Response } from 'express';
import { User } from './user.model';

class UserController {
  async handleCreateRequest(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
      const user = await AppDataSource.getRepository(User).save({
        name,
        email,
        password_hash: password,
      });
      return res.send({ ok: true, user: { id: user.id, name: user.name } });
    } catch (error) {
      console.log(error, 'error creating user');
    }
  }
}

export default new UserController();

