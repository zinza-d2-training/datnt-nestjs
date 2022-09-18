import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/User';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.USERNAME,
      password: process.env.PASSWORD_DATABASE,
      database: process.env.DATABASE_NAME,
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
