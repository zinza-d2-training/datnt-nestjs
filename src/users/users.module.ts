import {
  Logger,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../typeorm/User';
import { UsersController } from './controllers/users/users.controller';
import { AnotherMiddleware } from './middlewares/another.middleware';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AnotherMiddleware, LoggerMiddleware).forRoutes('user');
  }
}
