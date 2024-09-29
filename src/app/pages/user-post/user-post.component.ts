import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { ToastrService } from 'ngx-toastr';
import { UpdatePopupComponent } from '../update-popup/update-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrl: './user-post.component.css'
})
export class UserPostComponent {

  posts$ = this.postService.getPostsById();

  constructor(
    private postService: PostService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  deletePost(postId: number) {
    this.postService.deletePost(postId).subscribe(() => {
      this.toastr.success('Post deleted successfully!', '');
      this.posts$ = this.postService.getPostsById();
    });
  }

  updatePost(postId: number) {
    this.postService.getPostById(postId).subscribe(post => {
      const dialogRef = this.dialog.open(UpdatePopupComponent, {
        width: '400px',
        data: post
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.posts$ = this.postService.getPostsById();
        }
      });
    });
  }

}
