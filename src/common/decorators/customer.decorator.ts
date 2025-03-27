import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Customer = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const customer = request.customer;

  return data ? customer?.[data] : customer;
});
