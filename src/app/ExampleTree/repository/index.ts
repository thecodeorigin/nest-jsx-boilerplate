import { EntityRepository } from "typeorm";
import { TreeBaseRepository } from "@app/BaseTree/Repository";
import { TreeExample } from "../index.entity.example"

@EntityRepository(TreeExample)
export class TreeExampleRepository extends TreeBaseRepository<TreeExample> {
}
