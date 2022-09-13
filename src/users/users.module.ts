import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../typeorm/User';
import { UsersController } from './controllers/users.controller';
import { ValidatorUserMiddleware } from './middlewares/validator-user.middleware';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidatorUserMiddleware).forRoutes('user/create');
  }
}
