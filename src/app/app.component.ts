import { Component, OnInit } from "@angular/core";
import { AppService } from "../shared/app.service";

export type Movie = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
  Plot: string;
};

export type MoviesData = {
  Search: Array<Movie>;
  Response: string;
  totalResults: string;
  Error: string;
};

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "Movie Search";
  movieTitle = "Beta test";

  searchResults: Array<Movie> = [];
  error: string = '';
  selectedMovie!: Movie;
  constructor(public appService: AppService) {}

  ngOnInit() {
    this.appService.getSearchMoviesResult("test").subscribe((data: {}) => {
      console.log(data);
    });
  }

  searchMovies(event: Event): void {
    const value = (<HTMLInputElement>event?.target).value;
    if(value) {
      this.appService.getSearchMoviesResult(value).subscribe((data: MoviesData) => {
        const { Response, Search, Error } = data;
        if (Response === "True") {
          this.error = '';
          this.searchResults = Search;
        } else if(Error) {
          this.searchResults = [];
          this.error = Error;
        }
      });
    }
  }

  getMovie(imdbID: string): void {
    if(imdbID) {
      this.appService.getSearchMovieResultById(imdbID).subscribe((movie: Movie) => {
        this.selectedMovie = movie;
        console.log(this.selectedMovie);
        
      })
    }
  }
}
