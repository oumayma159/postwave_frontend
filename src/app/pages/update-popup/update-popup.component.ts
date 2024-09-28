import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostService } from '../../services/post.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-popup',
  templateUrl: './update-popup.component.html',
  styleUrl: './update-popup.component.css'
})
export class UpdatePopupComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdatePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public post: any,
    private postService: PostService,
    private toastr: ToastrService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  updatePost(): void {
    this.postService.updatePost(this.post.id, this.post).subscribe(() => {
      this.toastr.success('Post updated successfully!', '');
      this.dialogRef.close(true);
    });
  }

}
