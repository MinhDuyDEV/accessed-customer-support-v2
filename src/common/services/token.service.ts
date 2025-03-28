import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);

  constructor(private readonly jwtService: JwtService) {}

  decodeToken(token: string): any {
    try {
      this.logger.debug('Decoding token...');
      const payload = this.jwtService.decode(token);
      this.logger.debug(`Decoded payload: ${JSON.stringify(payload)}`);

      if (!payload) {
        this.logger.error('Invalid token: no payload');
        return null;
      }

      const userInfo = payload?.user_info;
      if (!userInfo) {
        this.logger.error('Invalid token: missing user info');
        return null;
      }

      const customer = {
        id: userInfo.id,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        username: userInfo.username,
      };

      this.logger.debug(`Extracted user info: ${JSON.stringify(customer)}`);
      return customer;
    } catch (error) {
      this.logger.error(`Token decode error: ${error.message}`);
      return null;
    }
  }
}
