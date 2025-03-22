import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";
import List from "./List";

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
      name,
      description,
      type,
      privacy,
      created,
      updated,
      movieIds = [],
      posterUrls = [],
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
    });
  },
};
