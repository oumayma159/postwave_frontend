import {Component} from '@angular/core';
import {PostService} from '../../services/post.service';
import {ToastrService} from 'ngx-toastr';
import {UpdatePopupComponent} from '../update-popup/update-popup.component';
import {MatDialog} from '@angular/material/dialog';
import {Observable, startWith, Subject, switchMap, tap} from "rxjs";
import {Post} from "../../models/post.model";

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrl: './user-post.component.css'
})
export class UserPostComponent {
  post_subject = new Subject<Observable<Post[]>>()
  posts$ = this.post_subject.pipe(startWith(this.postService.getPostsById()), switchMap((x) => x));

  constructor(
    private postService: PostService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
  }

  deletePost(postId: number) {

    this.post_subject.next(this.postService.deletePost(postId).pipe(tap(() => {
      this.toastr.success('Post deleted successfully!', '');
    })))

  }

  updatePost(postId: number) {
    this.postService.getPostById(postId).subscribe(post => {
      const dialogRef = this.dialog.open(UpdatePopupComponent, {
        width: '400px',
        data: post
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.data) {
          this.post_subject.next(this.postService.updatePost(result.data.id, result.data).pipe(tap(() => {
            this.toastr.success('Post updated successfully!', '');
          })))
        }
      });
    });
  }

}
