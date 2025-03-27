import { Customer } from 'src/modules/customers/schemas/customer.schema';
import { BaseRepositoryInterface } from '../base/base.interface.repository';

export interface CustomerRepositoryInterface extends BaseRepositoryInterface<Customer> {}
