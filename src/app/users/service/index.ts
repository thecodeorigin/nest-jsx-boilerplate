import { BaseService } from '@base/Service';
import { Injectable } from '@nestjs/common';
import { User } from '../index.entity';
import { UsersRepository } from '../repository'

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    public repository: UsersRepository
  ) { super(repository) }
}
