import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './controller';
import { RolesRepository } from './repository';
import { RolesService } from './service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RolesRepository])
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService]
})
export class ExampleModule {}
