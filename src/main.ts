import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, BadRequestException } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('NestApplication');
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const nodeEnv = configService.get<string>('NODE_ENV') || 'development';

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.reduce((acc, error) => {
          acc[error.property] = Object.values(error.constraints || {});
          return acc;
        }, {});

        return new BadRequestException({
          message: 'Validation failed',
          error: 'Bad Request',
          details: formattedErrors,
          code: 'VALIDATION_FAILED',
        });
      },
    }),
  );

  // Setup Swagger
  setupSwagger(app, port, nodeEnv);

  // Only show Swagger docs URL in non-production environments
  if (nodeEnv !== 'production') {
    logger.log(`Swagger documentation is available at http://localhost:${port}/api/docs`);
  }

  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
