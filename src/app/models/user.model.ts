import { Role } from "./enums/role.enum";


export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: Role;
}
