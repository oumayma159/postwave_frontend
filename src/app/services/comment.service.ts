import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,catchError,EMPTY} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private apiUrl = 'http://localhost:8080/api/v1/comment';


  constructor(private http: HttpClient) {}

  addComment(postId: number,userId:number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/add_like/${userId}/${postId}`, {})
      .pipe(
        catchError((err) => {
          console.error('Error liking post', err);
          return EMPTY;
        })
      );
  }

  getComments(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/unlike/${postId}`)
      .pipe(
        catchError((err) => {
          console.error('Error unliking post', err);
          return EMPTY;
        })
      );
  }

 
}