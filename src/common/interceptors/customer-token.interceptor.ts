import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenUtil } from '../utils/token.util';

@Injectable()
export class CustomerTokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Bearer token is required');
    }

    try {
      const token = authHeader.split(' ')[1];
      const customerInfo = TokenUtil.decodeToken(token);
      request.customer = customerInfo;
      return next.handle();
    } catch (error) {
      throw new UnauthorizedException('Invalid token format');
    }
  }
}
