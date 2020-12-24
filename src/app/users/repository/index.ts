import { BaseRepository } from "src/app/Base/Repository";
import { EntityRepository } from "typeorm";
import { User } from "../index.entity"

@EntityRepository(User)
export class UsersRepository extends BaseRepository<User> {
}
