import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  posts$ = this.postService.getAllPosts();
  users$ = this.adminService.getAllUsers();

  constructor(
    private postService: PostService,
    private adminService: AdminService
  ) {}

}
