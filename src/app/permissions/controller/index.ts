import { UseCrud } from '@common/decorators/crud.decorator';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '@nestjsx/crud';
import { Permission } from '../index.entity';
import { PermissionsService } from '../service';

@ApiTags('permissions')
@UseCrud(Permission, {
  routes: {
    only: ['getOneBase', 'getManyBase'],
  }
})
@Controller('permissions')
export class PermissionsController implements CrudController<Permission> {
  constructor(public service: PermissionsService) {}
}
