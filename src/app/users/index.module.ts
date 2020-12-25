import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controller';
import { UsersRepository } from './repository';
import { UsersService } from './service';
import { RolesModule } from '../roles/index.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    RolesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
