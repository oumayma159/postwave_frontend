import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  createPostForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {
    this.createPostForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.createPostForm.valid) {
      const newPost: Post = {
        title: this.createPostForm.get('title')?.value,
        description: this.createPostForm.get('description')?.value
      };
      
      this.postService.createPost(newPost).subscribe(
        () => {
          this.router.navigate(['/home']); 
        }
      );
    }
  }
}