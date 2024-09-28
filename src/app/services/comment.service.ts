import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,catchError,EMPTY} from 'rxjs';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8080/api/v1/comment';


  constructor(private http: HttpClient) {}

  addComment(comment: Comment,postId:number): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/${postId}`, comment)
      .pipe(
        catchError((err) => {
          console.error('Error adding comment', err);
          return EMPTY;
        })
      );
  }

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${postId}`)
      .pipe(
        catchError((err) => {
          console.error('Error fetching comments', err);
          return EMPTY;
        })
      );
  }

 
}