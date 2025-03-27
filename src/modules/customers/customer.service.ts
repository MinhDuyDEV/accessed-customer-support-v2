import { Inject, Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from 'src/core/services/base/base.abstract.service';
import { Customer } from './schemas/customer.schema';
import { CustomerRepositoryInterface } from 'src/core/repositories/interfaces/customer.interface';

@Injectable()
export class CustomerService extends BaseServiceAbstract<Customer> {
  constructor(
    @Inject('CustomerRepositoryInterface')
    private readonly customerRepository: CustomerRepositoryInterface,
  ) {
    super(customerRepository);
  }
}
