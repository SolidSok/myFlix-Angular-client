import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { MovieViewComponent } from '../movie-view/movie-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  /**
   * Gets movies from api call and sets the movies state to return JSON file
   * @returns array holding movies objects
   * @function getAllMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Gets favorite movies from api call and sets the favorites variable to return JSON file
   * @returns array holding ids of user's favorite movies
   * @function getFavoriteMovies
   */
  getFavorites(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      console.log(this.favorites, 'favorites');
      return this.favorites;
    });
  }

  /**
   * checks if a movie is included in the user's list of favorite movies
   * @param id
   * @returns true, if the movie is a favorite move, else false
   */
  isFav(id: string): boolean {
    return this.favorites.includes(id);
  }

  /**
   * opens the director dialog from DirectorViewComponent to display details about the director
   * @param name
   * @param bio
   * @param birthday
   */
  openDirectorDialog(name: string, bio: string, birthday: Date): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthday: birthday,
      },
      width: '500px',
    });
  }

  /**
   * opens the genre dialog from GenreViewComponent to display details about the genre
   * @param name
   * @param description
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px',
    });
  }

  /**
   * opens the movie dialog from MovieViewComponent to display details about the movie
   * @param title
   * @param description
   */
  openMovieDialog(title: string, description: string): void {
    this.dialog.open(MovieViewComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '500px',
    });
  }

  /**
   * adds a movie to the list of favorite movies via an API call
   * @param id
   * @function addFavorite
   */
  addFavorite(id: string): void {
    this.fetchApiData.addFavorite(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }

  /**
   * removes a movie from the list of favorite movies via an API call
   * @param id
   * @function deleteFavorite
   */
  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavorite(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }
}
