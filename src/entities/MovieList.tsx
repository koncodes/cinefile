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
    movieIds = new List<number>(),
    posterUrls = new List<string>(),
  }: Omit<Partial<FirestoreMovieList>, "userId"> & {
    userId: string;
    id?: string;
  }) {
    this.id = id ?? crypto.randomUUID();
    this.userId = userId;
    this.name = name;
    this.description = description;
    this.type = type;
    this.privacy = privacy;
    this.created = created ?? Timestamp.now();
    this.updated = updated ?? Timestamp.now();
    this.movieIds = Array.isArray(movieIds)
      ? new List<number>(movieIds)
      : new List<number>();
    this.posterUrls = Array.isArray(posterUrls)
      ? new List<string>(posterUrls)
      : new List<string>();
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
      movieIds = new List<number>(data?.movieIds || []),
      posterUrls = new List<string>(data?.posterUrls || []),
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
