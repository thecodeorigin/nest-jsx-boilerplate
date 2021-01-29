import { RolesService } from '@app/roles/service';
import { BaseService } from '@base/Service';
import { Injectable } from '@nestjs/common';
import { CrudRequest } from '@nestjsx/crud';
import { FindOneOptions } from 'typeorm';
import { CreateUserDto } from '../dto/create.dto';
import { UpdateSelfUserDto } from '../dto/update-self.dto';
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

  async getOne(req: CrudRequest): Promise<User> {
    const user = await this.repository.findOne({
      where: { id: req.parsed.paramsFilter[0].value }
    })
    user['permissions'] = RolesService.flattenRolesIntoPermissions(user.roles)
    return user
  }

  async createOne(req: CrudRequest, dto: CreateUserDto): Promise<User> {
    const { email, phone } = dto
    await this.failIfDuplicated({ email, phone })
    dto["roles"] = [await this.rolesService.findOne({ where: { name: 'USER' } })]

    const user = await super.createOne(req, dto)
    return user
  }

  async createOneGoogle(dto: any): Promise<any> {
    const { email } = dto
    await this.failIfDuplicated({ email })
    dto.roles = [await this.rolesService.findOne({ where: { name: 'GUEST'}})]

    const user = await super.createOne(null, dto)
    return UsersService.getUsersWithoutPassword(user)
  }

  async updateSelf(user: any, dto: UpdateSelfUserDto) {
    await this.failIfDuplicated({ phone: dto?.phone })

    const updated = 
      await this.updateOneWithOptionsOrFail({ where: { id: user.id } }, dto)
      
    return updated
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
