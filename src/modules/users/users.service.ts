import { Inject, Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UsersRepositoryInterface } from './interfaces/users.interface';
import { BaseServiceAbstract } from 'src/core/services/base/base.abstract.service';

@Injectable()
export class UsersService extends BaseServiceAbstract<User> {
  constructor(
    @Inject('UsersRepositoryInterface')
    private readonly usersRepository: UsersRepositoryInterface,
  ) {
    super(usersRepository);
  }
}
