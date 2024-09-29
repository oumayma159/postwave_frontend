import { User } from "./user.model";
import { Comment } from "./comment.model";

export class Post {

    id: number=0;
    title: string = '';
    description: string='';
    user : User = new User();
    numberLikes: number=0;
    liked: boolean=false;
    comments: Comment[] = [];
    
  }