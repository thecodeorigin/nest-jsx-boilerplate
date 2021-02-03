import { BaseRepository } from "@app/Template/Base/Repository";
import { EntityRepository } from "typeorm";
import { ExampleSlug } from "../index.entity.example"

@EntityRepository(ExampleSlug)
export class ExampleSlugRepository extends BaseRepository<ExampleSlug> {
}
