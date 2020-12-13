import { BaseRepository } from "src/app/Base/Repository";
import { EntityRepository } from "typeorm";
import { Example } from "../index.entity.example"

@EntityRepository(Example)
export class ExampleRepository extends BaseRepository<Example> {
}
