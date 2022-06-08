/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // global endpoints prefix
    app.setGlobalPrefix('api/user');
    // handle all user input validation globally
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
bootstrap();