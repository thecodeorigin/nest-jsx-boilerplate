import { PERMISSIONS } from '@common/constants/permission';
import { Auth } from '@common/decorators/auth.decorator';
import { UseCrud } from '@common/decorators/crud.decorator';
import { Body, Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CrudController, Override } from '@nestjsx/crud';
import { CreateTreeExampleDto } from '../dto/create.dto';
import { UpdateTreeExampleDto } from '../dto/update.dto';
import { TreeExample } from '../index.entity.example';
import { TreeExampleService } from '../service';

@ApiTags('{{entity}}s')
@UseCrud(TreeExample, {
  dto: {
    create: CreateTreeExampleDto,
    update: UpdateTreeExampleDto,
  },
  routes: {
    only: ['createOneBase', 'updateOneBase', 'getManyBase']
  }
})
@Controller('{{entity}}s')
export class TreeExampleController implements CrudController<TreeExample> {
  constructor(public service: TreeExampleService) {}

  @Override('createOneBase')
  @Auth(PERMISSIONS.CATEGORY.CREATE_ALL)
  createOne(
    @Body() dto: CreateTreeExampleDto
  ): Promise<TreeExample> {
    return this.service.createOne(dto)
  }

  @Override('getManyBase')
  getManyTree(): Promise<TreeExample[]> {
    return this.service.getManyTree()
  }

  @Get('/roots')
  @ApiOperation({ summary: 'Retrieve many Root Items' })
  async getManyRoot() {
    return this.service.getManyRoots()
  }

  @Get('/:id/children')
  @ApiOperation({ summary: 'Retrieve Children Items' })
  async getChildren(
    @Param('id', ParseIntPipe) id: number
  ): Promise<TreeExample> {
    return this.service.getTreeChildren(id)
  }

  @Get('/:id/parent')
  @ApiOperation({ summary: 'Retrieve one closest parent'})
  async getOneClosestParent(
    @Param('id', ParseIntPipe) id: number
  ): Promise<TreeExample> {
    return this.service.getOneClosestParent(id)
  }
}
