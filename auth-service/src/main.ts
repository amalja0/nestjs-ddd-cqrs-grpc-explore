import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PORT;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: ['user'],
      protoPath: join(__dirname, '../proto/user.proto'),
      url: `0.0.0.0:${port}`
    }
  });

  Logger.log(`Application is running on: http://localhost:${port}`);
  await app.listen();
}
bootstrap();
