import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = 'http://127.0.0.1:3001/users';
  private userUrl = 'http://127.0.0.1:3001/user/';
  constructor(private http: HttpClient) {}
  getUsers() : Observable<[]>{
    return this.http.get<[]>(this.usersUrl).pipe(
      tap(data => console.log('Total: ', data.length)),
      catchError(this.handleError)
    );
  }

  getUser(id: string) : Observable<[]>{
    return this.http.get<[]>(this.userUrl + id).pipe(
      tap(data => console.log('Total: ', data.length)),
      catchError(this.handleError)
    );
  }

  addUser(data: any) : Observable<[]> {
    return this.http.post<any>(this.userUrl + data.id, data).pipe(
      catchError(this.handleError)
    );
  }

  editUser(data: any) : Observable<[]> {
    return this.http.put<any>(this.userUrl + 'idFicticio', data).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error ocurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
