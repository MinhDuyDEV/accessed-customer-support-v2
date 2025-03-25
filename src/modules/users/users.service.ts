import { Inject, Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { BaseServiceAbstract } from 'src/core/services/base/base.abstract.service';
import { UsersRepositoryInterface } from 'src/core/repositories/interfaces/users.interface';

@Injectable()
export class UsersService extends BaseServiceAbstract<User> {
  constructor(
    @Inject('UsersRepositoryInterface')
    private readonly usersRepository: UsersRepositoryInterface,
  ) {
    super(usersRepository);
  }
}
