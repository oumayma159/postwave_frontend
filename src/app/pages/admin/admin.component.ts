import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  posts$ = this.postService.getAllPosts();
  users$ = this.userService.getAllUsers();

  constructor(
    private userService: UserService,
    private postService: PostService
  ) {}

}
