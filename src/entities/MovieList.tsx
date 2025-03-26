import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";
import List from "./List";
import { MovieReference } from "./Movie";
import { UserReference } from "./User";

interface FirebaseMovieList {
  userId: string;
  user: UserReference;
  name: string;
  description: string;
  type: string;
  privacy: string;
  created: Timestamp;
  updated: Timestamp;
  movieIds: number[];
  posterUrls: string[];
  movies: MovieReference[];
}

export class MovieList {
  id: string;
  userId: string;
  user: UserReference;
  name: string;
  description: string;
  type: string;
  privacy: string;
  created: Timestamp;
  updated: Timestamp;
  movieIds: List<number>;
  posterUrls: List<string>;
  movies: List<MovieReference>;

  constructor({
    id = "",
    userId = "",
    user = {} as UserReference,
    name = "Untitled",
    description = "",
    type = "watched",
    privacy = "public",
    created = Timestamp.now(),
    updated = Timestamp.now(),
    movieIds = new List<number>([]),
    posterUrls = new List<string>([]),
    movies = new List<MovieReference>([]),
  }) {
    this.id = id ?? crypto.randomUUID();
    this.userId = userId;
    this.user = user as UserReference;
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
        : new List<MovieReference>(
            (Array.isArray(movies)
              ? movies
              : (movies as List<MovieReference>).getItems()
            ).map((movie: MovieReference) => ({
              id: movie.id,
              poster_path: movie.poster_path,
              release_date: movie.release_date,
              title: movie.title,
              vote_average: movie.vote_average,
            }))
          );
  }

  addMovie(anotherMovie: MovieReference): void {
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

  toFirestore(): FirebaseMovieList {
    return {
      userId: this.userId,
      user: Object.assign({}, this.user),
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
}

export const movieListConverter: FirestoreDataConverter<MovieList> = {
  toFirestore(movieList: MovieList): DocumentData {
    return movieList.toFirestore();
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): MovieList {
    const data = snapshot.data();
    const {
      userId,
      user,
      name,
      description,
      type,
      privacy,
      created,
      updated,
      movieIds,
      posterUrls,
      movies,
    } = data as FirebaseMovieList;

    return new MovieList({
      id: snapshot.id,
      userId,
      user: user as UserReference,
      name,
      description,
      type,
      privacy,
      created,
      updated,
      movieIds: new List<number>(movieIds),
      posterUrls: new List<string>(posterUrls),
      movies: new List<MovieReference>(movies),
    });
  },
};
