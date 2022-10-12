import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UpdateUserViewComponent } from '../update-user-view/update-user-view.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  user: any = {};
  favoriteMovies: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Gets user data from api call and sets the user variable to returned JSON file
   * @returns object holding user information
   * @function getUser
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.favoriteMovies = resp.FavoriteMovies;
      console.log(this.user, this.favoriteMovies);
      return this.user;
    });
  }

  /**
   * opens the update user dialog from UpdateUserComponent to allow user to edit their details
   */
  openUpdateUserDialog(): void {
    this.dialog.open(UpdateUserViewComponent, { width: '300px' });
  }

  /**
   * deletes the user profile, redirects to welcome screen
   * @function deleteUser
   */
  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account?')) {
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'You have successfully deleted your account!',
          'Ok',
          { duration: 2000 }
        );
      });
    }
  }
}
