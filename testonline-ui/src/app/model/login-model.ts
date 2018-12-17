import { User } from "./user";

export class LogInModel {
  name: string;
  password: string;
/**
 *
 */
constructor(data: User) {
   this.name = data.userName;
   this.password = data.password;
}

}
