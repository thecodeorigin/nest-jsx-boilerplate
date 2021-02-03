import { EntityRepository } from "typeorm";
import { TreeBaseRepository } from "@app/Template/BaseTree/Repository";
import { TreeExample } from "../index.entity.example"

@EntityRepository(TreeExample)
export class TreeExampleRepository extends TreeBaseRepository<TreeExample> {
}
