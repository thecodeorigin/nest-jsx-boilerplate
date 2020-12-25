import { RolesService } from '@app/roles/service';
import { BaseService } from '@base/Service';
import { Injectable } from '@nestjs/common';
import { CrudRequest } from '@nestjsx/crud';
import { FindOneOptions } from 'typeorm';
import { CreateUserDto } from '../dto/create.dto';
import { User } from '../index.entity';
import { UsersRepository } from '../repository'

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    public repository: UsersRepository,
    public rolesService: RolesService,
  ) { super(repository) }

  async getOneAllProps(options: FindOneOptions): Promise<User> {
    return this.findOne(options)
  }

  async getOneNoPassword(options: FindOneOptions): Promise<any> {
    const user = await this.findOne(options)
    return UsersService.getUsersWithoutPassword(user)
  }

  async createOne(req: CrudRequest, dto: CreateUserDto): Promise<User> {
    const { email, phone } = dto
    await this.failIfDuplicated({ email, phone })
    dto["roles"] = [await this.rolesService.findOne({ where: { name: 'USER' } })]

    const user = await super.createOne(req, dto)
    /* We don't want to show the roles so just delete 'roles' prop from user */
    delete user.roles
    return user
  }

  /**
   * @usage take password property out of user('s)
   * @param users Can be User or User[]
   */
  public static getUsersWithoutPassword(users: User | User[]): any | any[] {
    if (!users) return undefined
    if (!Array.isArray(users)) {
      // eslint-disable-next-line
      const { password, ...partialUser } = users
      return partialUser
    }
    return users.map(user => {
      // eslint-disable-next-line
      const { password, ...partialUser } = user
      return partialUser
    })
  }
}
