import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://sokflix-herokupapp.com';
const token = localStorage.getItem('token');
const username = localStorage.getItem('user');
const headers = {
  headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
};

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // User Section //

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }
  //user login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }
  // get user
  getUser(): Observable<any> {
    return this.http
      .get<Response>(apiUrl + `users/${username}`, headers)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // edit user
  editUser(updateDetails: any): Observable<any> {
    return this.http
      .put<Response>(apiUrl + `users/${username}`, updateDetails, headers)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // delete user
  deleteUser(): Observable<any> {
    return this.http
      .delete<Response>(apiUrl + `users/${username}`, headers)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Movie Section //

  //get all movies
  getAllMovies(): Observable<any> {
    // Get Authorization token stored in local storage
    return this.http
      .get<Response>(apiUrl + 'movies', headers)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // get one movie
  getOneMovie(Title: any): Observable<any> {
    return this.http
      .get<Response>(apiUrl + `movies/${Title}`, headers)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // get director
  getDirector(Name: any): Observable<any> {
    return this.http
      .get<Response>(apiUrl + `directors/${Name}`, headers)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //get genre
  getGenre(Name: any): Observable<any> {
    return this.http
      .get<Response>(apiUrl + `genres/${Name}`, headers)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // get favorite movies for a user
  getFavoriteMovies(): Observable<any> {
    return this.http
      .get<Response>(apiUrl + `users/${username}/movies`, headers)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // add a movie to favorites
  addFavorite(movieID: string): Observable<any> {
    return this.http
      .post<Response>(
        apiUrl + `users/${username}/movies/${movieID}`,
        {},
        headers
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // delete a movie from favorites
  deleteFavorite(movieID: string): Observable<any> {
    return this.http
      .delete<Response>(apiUrl + `users/${username}/movies/${movieID}`, headers)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
