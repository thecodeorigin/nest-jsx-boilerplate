import { PERMISSIONS } from '@common/constants/permission';
import { Auth } from '@common/decorators/auth.decorator';
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
    getOneBase: { decorators: [Auth(PERMISSIONS.PERMISSION.READ_ALL)] },
    getManyBase: { decorators: [Auth(PERMISSIONS.PERMISSION.READ_ALL)] },
  },
})
@Controller('permissions')
export class PermissionsController implements CrudController<Permission> {
  constructor(public service: PermissionsService) {}
}
