import { PERMISSIONS } from '@common/constants/permission';
import { Auth } from '@common/decorators/auth.decorator';
import { UseCrud } from '@common/decorators/crud.decorator';
import { PaginateQueryOptions } from '@common/dto/paginate-query-options';
import { Controller, Delete, Get, Param, ParseIntPipe, Patch, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CrudController, Override } from '@nestjsx/crud';
import { CreateUserDto } from '../dto/create.dto';
import { UpdateUserDto } from '../dto/update.dto';
import { User } from '../index.entity';
import { UsersService } from '../service';

@ApiTags('users')
@UseCrud(User, {
  dto: {
    create: CreateUserDto,
    update: UpdateUserDto
  },
  routes: {
    // createOneBase: { decorators: [Auth(PERMISSIONS.USER.CREATE_ALL)] },
    // getOneBase: { decorators: [Auth(PERMISSIONS.USER.READ_ALL)] },
    // getManyBase: { decorators: [Auth(PERMISSIONS.USER.READ_ALL)] },
    updateOneBase: { decorators: [Auth(PERMISSIONS.USER.UPDATE_ALL)] }
  },
  query: {
    exclude: ['password']
  }
})
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}

  @Get('/trashed')
  @ApiOperation({ summary: 'Retrieve all soft-deleted Example'})
  @Auth(PERMISSIONS.USER.READ_TRASH_ALL)
  getManyTrashed(
    @Query() paginateOptions: PaginateQueryOptions
  ): Promise<any> {
    return this.service.getManyTrashed(paginateOptions)
  }

  @Patch('/:id/restore')
  @ApiOperation({ summary: 'Restore one soft-deleted Example'} )
  @Auth(PERMISSIONS.USER.RESTORE_ALL)
  restoreOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<User> {
    return this.service.restoreOne(id)
  }

  @Override('deleteOneBase')
  @Auth(PERMISSIONS.USER.SOFT_DELETE_ALL)
  softDeleteOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<any> {
    return this.service.softDeleteOne(id)
  }

  @Delete('/:id/permanently')
  @ApiOperation({ summary: 'Delete one Example permanently'})
  @Auth(PERMISSIONS.USER.DELETE_ALL)
  hardDeleteOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<any> {
    return this.service.hardDeleteOne(id)
  }
}
