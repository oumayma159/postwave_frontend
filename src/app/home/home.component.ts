import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { ToastrService } from 'ngx-toastr';
import { LikeService } from '../services/like.service';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment.model';
import { EMPTY, Observable, tap } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent  {
  comments : string[] = [];
  posts$ =  this.postService.getAllPosts().pipe(
    tap((posts: Post[]) => {
      posts.map(() => this.comments.push(''));
    }
  ));
  selectedPostId: number | null = null;
  // userConnected$: User = this.userService.getUserFromToken();
  

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private postService: PostService,
    private likeService: LikeService,
    private commentService: CommentService,
    private userService: UserService
  ) {}


  changeCommentInput(event: any, index: number) {
    this.comments[index] = event.target.value;
  }
  
  createPost() {
    this.router.navigate(['/create-post']);
  }

  addLike(post: Post): void {
    if (post.liked) {
      // unlike
      this.likeService.unlikePost(post.id).subscribe(() => {
        post.liked = false;
        post.numberLikes--;
      });
    } else {
      // like
      this.likeService.likePost(post.id).subscribe(() => {
        post.liked = true;
        post.numberLikes++;
      });
    }
  }

  loadComments(post: Post) {
    this.commentService.getComments(post.id).subscribe((comments: Comment[]) => {
      post.comments = comments;
    });
  }

  addComment(post: Post, userConnected: User, index: number) {
    if (this.comments[index].trim()) {
      const comment: Comment = {
        content: this.comments[index],
        author : userConnected
      };
      this.commentService.addComment(comment, post.id).subscribe(() => {
        this.comments[index] = '';  
        this.loadComments(post);
      });
    }

  }


}