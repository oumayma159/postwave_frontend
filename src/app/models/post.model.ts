import { User } from "./user.model";

export class Post {

    id: number=0;
    title: string = '';
    description: string='';
    user : User = new User();
    
  }