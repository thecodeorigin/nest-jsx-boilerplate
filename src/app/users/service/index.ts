import { BaseService } from '@base/Service';
import { Injectable } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { User } from '../index.entity';
import { UsersRepository } from '../repository'

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    public repository: UsersRepository
  ) { super(repository) }

  async getOneAllProps(options: FindOneOptions): Promise<User> {
    return this.findOne(options)
  }

  async getOneNoPassword(options: FindOneOptions): Promise<any> {
    const user = await this.findOne(options)
    return UsersService.getUsersWithoutPassword(user)
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
