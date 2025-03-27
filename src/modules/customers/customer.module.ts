import { MongooseModule } from '@nestjs/mongoose';
import { CustomerRepository } from 'src/core/repositories/customer.repository';
import { CustomerService } from './customer.service';
import { Customer } from './schemas/customer.schema';
import { CustomerSchema } from './schemas/customer.schema';
import { Module } from '@nestjs/common';

@Module({
  imports: [MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }])],
  providers: [
    CustomerService,
    { provide: 'CustomerRepositoryInterface', useClass: CustomerRepository },
  ],
  exports: [CustomerService],
})
export class CustomersModule {}
