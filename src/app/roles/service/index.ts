import { BaseService } from '@base/Service';
import { Injectable } from '@nestjs/common';
import { Role } from '../index.entity';
import { RolesRepository } from '../repository'

@Injectable()
export class RolesService extends BaseService<Role> {
  constructor(
    public repository: RolesRepository
  ) { super(repository) }
}
