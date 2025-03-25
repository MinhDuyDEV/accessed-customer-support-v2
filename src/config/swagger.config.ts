import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication, port: number, nodeEnv: string) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Accessed Customer Support API')
    .setDescription('API documentation for Accessed Customer Support')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token',
    )
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management endpoints')
    .addTag('health', 'Health check endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // Add custom JS to hide endpoints in production
  if (nodeEnv === 'production') {
    // You could filter out sensitive endpoints in production
    // document.paths = filterEndpointsForProduction(document.paths);
  }

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
    customSiteTitle: 'Accessed API Documentation',
    customCss: '.swagger-ui .topbar { display: none }',
  });
}
