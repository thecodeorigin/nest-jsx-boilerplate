import { PermissionsModule } from '@app/permissions/index.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './controller';
import { RolesRepository } from './repository';
import { RolesService } from './service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RolesRepository]),
    PermissionsModule,
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService]
})
export class RolesModule {}
