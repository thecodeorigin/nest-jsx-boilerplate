import { TreeBaseService } from '@app/BaseTree/Service';
import { Injectable } from '@nestjs/common';
import { TreeExample } from '../index.entity.example';
import { TreeExampleRepository } from '../repository'

@Injectable()
export class TreeExampleService extends TreeBaseService<TreeExample> {
  constructor(
    public repository: TreeExampleRepository
  ) { super(repository) }

  async createOne(dto: any) { 
    await this.failIfDuplicated(dto)
    const entity = this.repository.create(dto as TreeExample)
    if (dto['parentId']) {
      const parent = await this.repository.findOneOrFail(dto['parentId'])
      entity.parent = parent
    }
    return entity.save()
  }
}
