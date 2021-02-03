import { PERMISSIONS } from '@common/constants/permission';
import { Auth } from '@common/decorators/auth.decorator';
import { UseCrud } from '@common/decorators/crud.decorator';
import { PaginateQueryOptions } from '@common/dto/paginate-query-options';
import { Controller, Delete, Get, Param, Patch, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CrudController, Override } from '@nestjsx/crud';
import { CreateExampleDto } from '../dto/create.dto';
import { UpdateExampleDto } from '../dto/update.dto';
import { ExampleSlug } from '../index.entity.example';
import { ExampleSlugService } from '../service';

@ApiTags('{{entity}}s')
@UseCrud(ExampleSlug, {
  dto: {
    create: CreateExampleDto,
    update: UpdateExampleDto
  },
  routes: {
    createOneBase: { decorators: [Auth(PERMISSIONS.USER.CREATE_ALL)] },
    getOneBase: { decorators: [Auth(PERMISSIONS.USER.READ_ALL)] },
    getManyBase: { decorators: [Auth(PERMISSIONS.USER.READ_ALL)] },
    updateOneBase: { decorators: [Auth(PERMISSIONS.USER.UPDATE_ALL)] }
  },
  params: {
    slug: {
      field: 'slug',
      type: 'string',
      primary: true
    }
  }
})
@Controller('{{entity}}s')
export class ExampleSlugController implements CrudController<ExampleSlug> {
  constructor(public service: ExampleSlugService) {}

  @Get('/trashed')
  @ApiOperation({ summary: 'Retrieve all soft-deleted Example'})
  @Auth(PERMISSIONS.USER.READ_TRASH_ALL)
  getManyTrashed(
    @Query() paginateOptions: PaginateQueryOptions
  ): Promise<any> {
    return this.service.getManyTrashed(paginateOptions)
  }

  @Patch('/:slug/restore')
  @ApiOperation({ summary: 'Restore one soft-deleted Example'} )
  @Auth(PERMISSIONS.USER.RESTORE_ALL)
  restoreOne(
    @Param('slug') slug: string
  ): Promise<ExampleSlug> {
    return this.service.restoreOne({ slug })
  }

  @Override('deleteOneBase')
  @Auth(PERMISSIONS.USER.SOFT_DELETE_ALL)
  softDeleteOne(
    @Param('slug') slug: string
  ): Promise<any> {
    return this.service.softDeleteOne({ slug })
  }

  @Delete('/:slug/permanently')
  @ApiOperation({ summary: 'Delete one Example permanently'})
  @Auth(PERMISSIONS.USER.DELETE_ALL)
  hardDeleteOne(
    @Param('slug') slug: string
  ): Promise<any> {
    return this.service.hardDeleteOne({ slug })
  }
}
