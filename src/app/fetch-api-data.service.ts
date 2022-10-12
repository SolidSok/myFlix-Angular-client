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
const apiUrl = 'https://sokflix.herokuapp.com/';
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

  /**
   * calls API endpoint to register a new user
   * @param userDetails
   * @returns a new user object in JSON format
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }
  /**
   * calls API endpoint to login an existing user
   * @param userDetails
   * @returns data of the user in JSON format
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }
  /**
   * calls API endpoint to get data on a single user
   * @returns JSON object holding data about the requested user
   */
  // get user
  getUser(): Observable<any> {
    return this.http
      .get<Response>(apiUrl + `users/${username}`, headers)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * calls API endpoint to allow user to update their user information
   * @param updateDetails
   * @returns JSON object holding data about the updated user
   */
  // edit user
  editUser(updateDetails: any): Observable<any> {
    return this.http
      .put<Response>(apiUrl + `users/${username}`, updateDetails, headers)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * calls API endpoint to deregister an existing user
   * @returns	A success message indicating that the profile was successfully deleted.
   */
  // delete user
  deleteUser(): Observable<any> {
    return this.http
      .delete<Response>(apiUrl + `users/${username}`, headers)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Movie Section //
  /**
   * calls API endpoint to get data on all movies
   * @returns array of all movies in JSON format
   */
  //get all movies
  getAllMovies(): Observable<any> {
    // Get Authorization token stored in local storage
    return this.http
      .get<Response>(apiUrl + 'movies', headers)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * calls API endpoint to get data on a single movie specified by its title
   * @param Title
   * @returns JSON object holding movie data
   */
  // get one movie
  getOneMovie(Title: any): Observable<any> {
    return this.http
      .get<Response>(apiUrl + `movies/${Title}`, headers)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * calls API endpoint to get data on a director
   * @param Name
   * @returns JSON obejct holding director data
   */
  // get director
  getDirector(Name: any): Observable<any> {
    return this.http
      .get<Response>(apiUrl + `directors/${Name}`, headers)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * calls API endpoint to get data on a genre
   * @param Name
   * @returns JSON object holding genre data
   */
  //get genre
  getGenre(Name: any): Observable<any> {
    return this.http
      .get<Response>(apiUrl + `genres/${Name}`, headers)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * calls API endpoint to get list of favorite movies of this user
   * @returns list of the user's favorite movies in JSON format
   */
  // get favorite movies for a user
  getFavoriteMovies(): Observable<any> {
    return this.http
      .get<Response>(apiUrl + `users/${username}`, headers)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * calls API endpoint to add a movie to the user's list of favorite movies
   * @param movieID
   * @returns JSON object holding data about the updated user
   */
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
  /**
   * calls API endpoint to delete a movie from the user's list of favorite movies
   * @param movieID
   * @returns JSON object holding data about the updated user
   */
  // delete a movie from favorites
  deleteFavorite(movieID: string): Observable<any> {
    return this.http
      .delete<Response>(apiUrl + `users/${username}/movies/${movieID}`, headers)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * extracts response data from HTTP response
   * @param res
   * @returns response body or empty object
   */
  // Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }
  /**
   * handles errors
   * @param error
   * @returns error message
   */
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
