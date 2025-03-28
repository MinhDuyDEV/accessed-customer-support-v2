import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BaseServiceAbstract } from 'src/core/services/base/base.abstract.service';
import { Customer } from './schemas/customer.schema';
import { CustomersRepositoryInterface } from 'src/core/repositories/interfaces/customers.interface';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomersService extends BaseServiceAbstract<Customer> {
  private readonly logger = new Logger(CustomersService.name);
  constructor(
    @Inject('CustomersRepositoryInterface')
    private readonly customersRepository: CustomersRepositoryInterface,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    super(customersRepository);
  }

  async findCustomerFromPartyService(customerId: string) {
    const partyServiceUrl = this.configService.get<string>('PARTY_SERVICE_URL');

    const customer = await this.customersRepository.findOneByCondition({ customerId });
    if (customer) {
      return customer;
    }

    const { data: customerExisting } = await firstValueFrom(
      this.httpService.get<any>(`${partyServiceUrl}/api/user/${customerId}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(`Failed to fetch customer data: ${error.message}`);
          throw new NotFoundException('Failed to fetch customer data');
        }),
      ),
    );
    if (!customerExisting) {
      throw new NotFoundException('Customer not found');
    }

    await this.customersRepository.create({
      customerId: customerExisting.data.id,
      name: customerExisting.data.name,
      firstName: customerExisting.data.firstName,
      lastName: customerExisting.data.lastName,
      email: customerExisting.data.primaryEmail?.value,
      phoneNumber: customerExisting.data.primaryPhone?.value,
      avatar: customerExisting.data.avatar,
      status: customerExisting.data.status,
      countryCode: customerExisting.data.countryCode,
      isoCode2: customerExisting.data.isoCode2,
      timezone: customerExisting.data.timezone,
    });

    return customerExisting.data;
  }
}
