import { User } from "@app/users/index.entity";

export class AuthResult {
  token: string
  user: User
}
