import { PERMISSIONS } from '@common/constants/permission';
import { Auth } from '@common/decorators/auth.decorator';
import { UseCrud } from '@common/decorators/crud.decorator';
import { PaginateQueryOptions } from '@common/dto/paginate-query-options';
import { Controller, Delete, Get, Param, ParseIntPipe, Patch, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CrudController, Override } from '@nestjsx/crud';
import { CreateRoleDto } from '../dto/create.dto';
import { UpdateRoleDto } from '../dto/update.dto';
import { Role } from '../index.entity';
import { RolesService } from '../service';

@ApiTags('roles')
@UseCrud(Role, {
  dto: {
    create: CreateRoleDto,
    update: UpdateRoleDto
  },
  routes: {
    createOneBase: { decorators: [Auth(PERMISSIONS.ROLE.CREATE_ALL)] },
    getOneBase: { decorators: [Auth(PERMISSIONS.ROLE.READ_ALL)] },
    getManyBase: { decorators: [Auth(PERMISSIONS.ROLE.READ_ALL)] },
    deleteOneBase: { decorators: [Auth(PERMISSIONS.ROLE.SOFT_DELETE_ALL)] },
    updateOneBase: { decorators: [Auth(PERMISSIONS.ROLE.UPDATE_ALL)] },
  },
})
@Controller('roles')
export class RolesController implements CrudController<Role> {
  constructor(public service: RolesService) {}

  @Get('/trashed')
  @ApiOperation({ summary: 'Retrieve all soft-deleted Role'})
  @Auth(PERMISSIONS.ROLE.READ_TRASH_ALL)
  getManyTrashed(
    @Query() paginateOptions: PaginateQueryOptions
  ): Promise<any> {
    return this.service.getManyTrashed(paginateOptions)
  }

  @Patch('/:id/restore')
  @ApiOperation({ summary: 'Restore one soft-deleted Role'} )
  @Auth(PERMISSIONS.ROLE.RESTORE_ALL)
  restoreOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Role> {
    return this.service.restoreOne({ id })
  }

  @Override('deleteOneBase')
  @Auth(PERMISSIONS.ROLE.SOFT_DELETE_ALL)
  softDeleteOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<any> {
    return this.service.softDeleteOne({ id })
  }

  @Delete('/:id/permanently')
  @ApiOperation({ summary: 'Delete one Role permanently'})
  @Auth(PERMISSIONS.ROLE.DELETE_ALL)
  hardDeleteOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<any> {
    return this.service.hardDeleteOne({ id })
  }
}
