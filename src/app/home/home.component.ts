import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  posts: Post[] = [];
  isLoggedIn = false;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private postService: PostService
  ) {
    
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.postService.getAllPosts().subscribe(
      (data: Post[]) => {
        this.posts = data;
      },
      error => {
        console.error('Error fetching posts', error);
      }
    );
  }
  
  createPost() {
    this.router.navigate(['/create-post']);
  }
}