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
})
@Controller('roles')
export class RolesController implements CrudController<Role> {
  constructor(public service: RolesService) {}

  @Get('/trashed')
  @ApiOperation({ summary: 'Retrieve all soft-deleted Role'})
  getManyTrashed(
    @Query() paginateOptions: PaginateQueryOptions
  ): Promise<any> {
    return this.service.getManyTrashed(paginateOptions)
  }

  @Patch('/:id/restore')
  @ApiOperation({ summary: 'Restore one soft-deleted Role'} )
  restoreOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Role> {
    return this.service.restoreOne(id)
  }

  @Override('deleteOneBase')
  softDeleteOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<any> {
    return this.service.softDeleteOne(id)
  }

  @Delete('/:id/permanently')
  @ApiOperation({ summary: 'Delete one Role permanently'})
  hardDeleteOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<any> {
    return this.service.hardDeleteOne(id)
  }
}
