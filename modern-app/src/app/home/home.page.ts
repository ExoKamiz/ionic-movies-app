import { Component, inject } from '@angular/core';
import { InfiniteScrollCustomEvent, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonSkeletonText, IonAvatar, IonAlert, IonLabel } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { catchError, finalize } from 'rxjs';
import { MovieResult } from '../services/interfaces';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonSkeletonText, IonAvatar, IonAlert, IonLabel, DatePipe],
})
export class HomePage {
  private movieService: MovieService = inject(MovieService);
  private currentPage: number = 1;
  public error: any = null;
  public isLoading: boolean = false;
  public movies: MovieResult[] = [];
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public dummyArray = new Array(5);

  constructor() {
    this.loadMovies();
  }

  private loadMovies(event?: InfiniteScrollCustomEvent): void {
    this.error = null;

    if (!event) {
      this.isLoading = true;
    }

    this.movieService.getTopRatedMovies(this.currentPage).pipe(
      finalize(() => {
        this.isLoading = false;
        if (event) {
          event.target.complete();
        }
      }),
      catchError((err: any) => {
        console.log(err);

        this.error = err.error.status_message;
        return [];
      })
    ).subscribe({
      next: (res) => {
        console.log(res);

        this.movies.push( ...res.results );
        if (event) {
          event.target.disabled = res.total_pages === this.currentPage;
        }
      }
    });
  }

  private loadMore(event: InfiniteScrollCustomEvent): void {

  }
}
