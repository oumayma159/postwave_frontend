import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,catchError,EMPTY} from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private apiUrl = 'http://localhost:8080/api/v1/like';


  constructor(private http: HttpClient) {}

  likePost(postId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/add_like/${postId}`, {})
      .pipe(
        catchError((err) => {
          console.error('Error liking post', err);
          return EMPTY;
        })
      );
  }

  unlikePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/unlike/${postId}`)
      .pipe(
        catchError((err) => {
          console.error('Error unliking post', err);
          return EMPTY;
        })
      );
  }

 
}