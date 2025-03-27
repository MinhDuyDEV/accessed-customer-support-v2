import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CustomerRepositoryInterface } from './interfaces/customer.interface';
import { Customer } from 'src/modules/customers/schemas/customer.schema';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';

@Injectable()
export class CustomerRepository
  extends BaseRepositoryAbstract<Customer>
  implements CustomerRepositoryInterface
{
  constructor(
    @InjectModel(Customer.name)
    private readonly customerRepository: Model<Customer>,
  ) {
    super(customerRepository);
  }
}
