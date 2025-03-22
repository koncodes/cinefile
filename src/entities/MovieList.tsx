import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";
import List from "./List";
import { FirestoreMovie } from "./Movie";

interface FirestoreMovieList {
  userId: string;
  name: string;
  description: string;
  type: string;
  privacy: string;
  created: Timestamp | null;
  updated: Timestamp | null;
  movieIds: number[];
  posterUrls: string[];
  movies: FirestoreMovie[];
}

interface MovieListConstructorParams {
  id?: string;
  userId: string;
  name?: string;
  description?: string;
  type?: string;
  privacy?: string;
  created?: Timestamp | null;
  updated?: Timestamp | null;
  movieIds?: number[] | List<number>;
  posterUrls?: string[] | List<string>;
  movies?: FirestoreMovie[] | List<FirestoreMovie>;
}

export class MovieList {
  id: string;
  userId: string;
  name: string;
  description: string;
  type: string;
  privacy: string;
  created: Timestamp;
  updated: Timestamp;
  movieIds: List<number>;
  posterUrls: List<string>;
  movies: List<FirestoreMovie>;

  constructor({
    id,
    userId,
    name = "Untitled",
    description = "",
    type = "watched",
    privacy = "public",
    created = Timestamp.now(),
    updated = Timestamp.now(),
    movieIds = [],
    posterUrls = [],
    movies = [],
  }: MovieListConstructorParams) {
    this.id = id ?? crypto.randomUUID();
    this.userId = userId;
    this.name = name;
    this.description = description;
    this.type = type;
    this.privacy = privacy;
    this.created = created ?? Timestamp.now();
    this.updated = updated ?? Timestamp.now();
    this.movieIds =
      movieIds instanceof List ? movieIds : new List<number>(movieIds);
    this.posterUrls =
      posterUrls instanceof List ? posterUrls : new List<string>(posterUrls);
    this.movies =
      movies instanceof List
        ? movies
        : new List<FirestoreMovie>(
            movies.map((movie: FirestoreMovie) => ({
              id: movie.id,
              poster_path: movie.poster_path,
              release_date: movie.release_date,
              title: movie.title,
              vote_average: movie.vote_average,
            }))
          );
  }

  toFirestore(): FirestoreMovieList {
    return {
      userId: this.userId,
      name: this.name,
      description: this.description,
      type: this.type,
      privacy: this.privacy,
      created: this.created,
      updated: this.updated,
      movieIds: this.movieIds.getItems(),
      posterUrls: this.posterUrls.getItems(),
      movies: this.movies.getItems(),
    };
  }

  addMovie(anotherMovie: FirestoreMovie): void {
    const index = this.movies
      .getItems()
      .findIndex((movie) => movie.id === anotherMovie.id);
    if (index === -1) {
      this.movies.addItem(anotherMovie);
      this.movieIds.addItem(anotherMovie.id);
      this.posterUrls.addItem(anotherMovie.poster_path);
      this.updated = Timestamp.now();
    }
  }

  removeMovie(movieId: number): void {
    const index = this.movies
      .getItems()
      .findIndex((movie) => movie.id === movieId);
    if (index !== -1) {
      const movie = this.movies.getItems()[index];
      this.movies.removeBy((item) => item.id === movieId);
      this.movieIds.removeItem(movieId);
      this.posterUrls.removeItem(movie.poster_path);
      this.updated = Timestamp.now();
    }
  }
}

export const movieListConverter: FirestoreDataConverter<MovieList> = {
  toFirestore(movieList: MovieList): DocumentData {
    return movieList.toFirestore();
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): MovieList {
    const data = snapshot.data();
    const {
      userId,
      name,
      description,
      type,
      privacy,
      created,
      updated,
      movieIds = [],
      posterUrls = [],
      movies = [],
    } = data as FirestoreMovieList;

    return new MovieList({
      id: snapshot.id,
      userId,
      name,
      description,
      type,
      privacy,
      created,
      updated,
      movieIds,
      posterUrls,
      movies,
    });
  },
};
