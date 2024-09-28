import { User } from "./user.model";
import { Comment } from "./comment.model";

export class Post {

    id: number=0;
    title: string = '';
    description: string='';
    user : User = new User();
    numberOfLikes: number=0;
    isLiked: boolean=false;
    comments: Comment[] = [];
    
  }