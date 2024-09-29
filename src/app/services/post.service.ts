import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8080/api/v1/post';

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/all_posts`)
    .pipe(
      catchError((err) => {
        console.error('Error fetching posts', err);
        return EMPTY;
      })
    );
    ;
  }

  getPostById(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/getPost/${postId}`)
    .pipe(
      catchError((err) => {
        console.error('Error fetching post', err);
        return EMPTY;
      })
    );
    ;
  }

  getPostsById(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/currentUserPosts`)
    .pipe(
      catchError((err) => {
        console.error('Error fetching user posts', err);
        return EMPTY;
      })
    );
    ;
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/add_post`, post)
    .pipe(
      catchError(()=>{
        console.error('Error creating post');
        return EMPTY;
      } )
    )
    ;
  }

  updatePost(postId: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/update/${postId}`, post)
    .pipe(
      catchError(()=>{
        console.error('Error updating post');
        return EMPTY;
      } )
    )
    ;
  }

  deletePost(postId: number): Observable<Post> {
    return this.http.delete<Post>(`${this.apiUrl}/delete/${postId}`)
    .pipe(
      catchError(()=>{
        console.error('Error deleting post');
        return EMPTY;
      } )
    )
    ;
  }

}