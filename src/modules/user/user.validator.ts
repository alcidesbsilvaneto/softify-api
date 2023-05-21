import { AppDataSource } from '@/common/database/data-source';
import { NextFunction, Request, Response } from 'express';
import { User } from './user.model';

class UserValidator {
  async validateCreateUserRequest(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;
    if (!name)
      return res.send({
        ok: false,
        message: 'missing-name',
        userMessage: 'Nome não enviado.',
      });
    if (!email)
      return res.send({
        ok: false,
        message: 'missing-email',
        userMessage: 'E-mail não enviado.',
      });
    if (!password)
      return res.send({
        ok: false,
        message: 'missing-password',
        userMessage: 'Senha não enviada.',
      });

    try {
      const user = await AppDataSource.getRepository(User).findOne({
        where: { email },
      });
      if (user)
        return res.send({
          ok: false,
          message: 'email-already-exists',
          userMessage: 'E-mail já cadastrado.',
        });
    } catch (error) {
      console.log(error, 'error finding user');
      return res.send({
        ok: false,
        message: 'error-creating-new-user',
        userMessage: 'Erro ao criar usuário.',
      });
    }
    next();
  }
}

export default new UserValidator();

