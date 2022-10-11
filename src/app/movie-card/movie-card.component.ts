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
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  getFavorites(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      console.log(this.favorites, 'favorites');
      return this.favorites;
    });
  }
  isFav(id: string): boolean {
    return this.favorites.includes(id);
  }
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
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px',
    });
  }
  openMovieDialog(title: string, description: string): void {
    this.dialog.open(MovieViewComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '500px',
    });
  }
  addFavorite(id: string): void {
    this.fetchApiData.addFavorite(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }
  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavorite(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }
}
