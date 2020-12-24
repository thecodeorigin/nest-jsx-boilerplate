import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controller';
import { UsersRepository } from './repository';
import { UsersService } from './service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class ExampleModule {}
