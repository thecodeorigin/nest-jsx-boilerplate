import { BaseService } from '@app/Template/Base/Service';
import { Injectable } from '@nestjs/common';
import { Example } from '../index.entity.example';
import { ExampleRepository } from '../repository'

@Injectable()
export class ExampleService extends BaseService<Example> {
  constructor(
    public repository: ExampleRepository
  ) { super(repository) }
}
