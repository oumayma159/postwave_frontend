import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { ToastrService } from 'ngx-toastr';
import { LikeService } from '../services/like.service';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment.model';
import { EMPTY, Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent  {
  posts$ =  this.postService.getAllPosts();
  selectedPostId: number | null = null;
  userId: any;
  isLiked = false;
  newComment: string = '';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private postService: PostService,
    private likeService: LikeService,
    private commentService: CommentService,
  ) {}

  ngOnInit(): void {
    const userIdString = localStorage.getItem('userId');
    this.userId = userIdString ? parseInt(userIdString, 10) : null;
  }
  
  createPost() {
    this.router.navigate(['/create-post']);
  }

  addLike(postId: number,userId:number) {
    this.likeService.likePost(postId,userId).subscribe(() => {
      this.toastr.success('Post liked successfully!', '');
      // this.posts$ = this.postService.getAllPosts();
      this.isLiked = true;
    });
  }

  loadComments(post: Post) {
    this.commentService.getComments(post.id).subscribe((comments: Comment[]) => {
      post.comments = comments;
    });
  }

  addComment(post: Post, userConnected: User) {
    if (this.newComment.trim()) {
      const comment: Comment = {
        content: this.newComment,
        author : userConnected
      };
      this.commentService.addComment(comment, post.id).subscribe(() => {
        this.newComment = ''; 
        this.loadComments(post);
      });
    }

  }


}