import { BaseRepositoryInterface } from 'src/core/repositories/base/base.interface.repository';
import { User } from 'src/modules/users/schemas/user.schema';

export interface UsersRepositoryInterface extends BaseRepositoryInterface<User> {}
