import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';
import { User } from 'src/modules/users/schemas/user.schema';
import { UsersRepositoryInterface } from 'src/modules/users/interfaces/users.interface';

@Injectable()
export class UsersRepository
  extends BaseRepositoryAbstract<User>
  implements UsersRepositoryInterface
{
  constructor(
    @InjectModel(User.name)
    private readonly usersRepository: Model<User>,
  ) {
    super(usersRepository);
  }
}
