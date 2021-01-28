import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as typeOrmConfig from 'src/config/typeorm.config';
import { UsersModule } from '@app/users/index.module'
import { AuthModule } from './auth/index.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
