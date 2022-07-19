import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Movie, MoviesData } from "src/app/app.component";

@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor(private http: HttpClient) {}

  rootURL = "https://www.omdbapi.com/";
  apiKey = "54c79377";

  getSearchMovieResultById(id: string): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.rootURL}?i=${id}&plot=full&apiKey=${this.apiKey}`
    );
  }

  getSearchMoviesResult(search: string): Observable<MoviesData> {
    return this.http.get<MoviesData>(`${this.rootURL}?s=${search}&apikey=${this.apiKey}`);
  }
}
