import { BaseRepository } from "@app/Template/Base/Repository";
import { EntityRepository } from "typeorm";
import { Example } from "../index.entity.example"

@EntityRepository(Example)
export class ExampleRepository extends BaseRepository<Example> {
}
