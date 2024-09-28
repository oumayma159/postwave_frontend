import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { ToastrService } from 'ngx-toastr';
import { LikeService } from '../services/like.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent  {
  posts$ =  this.postService.getAllPosts();
  userId: any;
  isLiked = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private postService: PostService,
    private likeService: LikeService
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

  addComment(postId: number) {

  }


}