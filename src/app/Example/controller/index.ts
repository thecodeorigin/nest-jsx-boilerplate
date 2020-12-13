import { PERMISSIONS } from '@common/constants/permission';
import { Auth } from '@common/decorators/auth.decorator';
import { UseCrud } from '@common/decorators/crud.decorator';
import { Controller, Delete, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CrudController, Override } from '@nestjsx/crud';
import { CreateExampleDto } from '../dto/create.dto';
import { UpdateExampleDto } from '../dto/update.dto';
import { Example } from '../index.entity.example';
import { ExampleService } from '../service';

@ApiTags('{{entity}}s')
@UseCrud(Example, {
  dto: {
    create: CreateExampleDto,
    update: UpdateExampleDto
  },
  routes: {
    createOneBase: { decorators: [Auth(PERMISSIONS.USER.CREATE_ALL)] },
    getOneBase: { decorators: [Auth(PERMISSIONS.USER.READ_ALL)] },
    getManyBase: { decorators: [Auth(PERMISSIONS.USER.READ_ALL)] },
    updateOneBase: { decorators: [Auth(PERMISSIONS.USER.UPDATE_ALL)] }
  }
})
@Controller('{{entity}}s')
export class ExampleController implements CrudController<Example> {
  constructor(public service: ExampleService) {}

  @Get('/trashed')
  @ApiOperation({ summary: 'Retrieve all soft-deleted Example'})
  @Auth(PERMISSIONS.USER.READ_TRASH_ALL)
  getManyTrashed(): Promise<Example[]> {
    return this.service.getManyTrashed()
  }

  @Patch('/:id/restore')
  @ApiOperation({ summary: 'Restore one soft-deleted Example'} )
  @Auth(PERMISSIONS.USER.RESTORE_ALL)
  restoreOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Example> {
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
