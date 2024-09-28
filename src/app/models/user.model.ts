import { Role } from "./enums/role.enum";


export class User {
  id: number=0;
  firstname: string='';
  lastname: string= '';
  email: string='';
  password: string= '';
  role: Role=Role.USER;
}
