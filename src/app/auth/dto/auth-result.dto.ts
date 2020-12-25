import { User } from "@app/users/index.entity";

export interface AuthResult {
  token: string
  user: User
}
