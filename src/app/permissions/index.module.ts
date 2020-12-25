import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsController } from './controller';
import { PermissionsRepository } from './repository';
import { PermissionsService } from './service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PermissionsRepository])
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService]
})
export class ExampleModule {}
