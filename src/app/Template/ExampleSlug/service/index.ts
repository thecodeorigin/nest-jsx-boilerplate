import { BaseService } from '@app/Template/Base/Service';
import { Injectable } from '@nestjs/common';
import { ExampleSlug } from '../index.entity.example';
import { ExampleSlugRepository } from '../repository'

@Injectable()
export class ExampleSlugService extends BaseService<ExampleSlug> {
  constructor(
    public repository: ExampleSlugRepository
  ) { super(repository) }
}
