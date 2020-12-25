import { BaseService } from '@base/Service';
import { Injectable } from '@nestjs/common';
import { Permission } from '../index.entity';
import { PermissionsRepository } from '../repository'

@Injectable()
export class PermissionsService extends BaseService<Permission> {
  constructor(
    public repository: PermissionsRepository
  ) { super(repository) }
}
