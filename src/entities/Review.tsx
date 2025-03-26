import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";
import { MovieReference } from "./Movie";
import { UserReference } from "./User";

interface FirestoreReview {
  userId: string;
  user: UserReference;
  rating: number;
  content: string;
  created: Timestamp;
  updated: Timestamp;
  movieId: number;
  movie: MovieReference;
}

export class Review {
  id: string;
  userId: string;
  user: UserReference;
  rating: number;
  content: string;
  created: Timestamp;
  updated: Timestamp;
  movieId: number;
  movie: MovieReference;

  constructor({
    id = "",
    userId = "",
    user = {} as UserReference,
    rating = 0,
    content = "",
    created = Timestamp.now(),
    updated = Timestamp.now(),
    movieId = 0,
    movie = {} as MovieReference,
  }) {
    this.id = id ?? crypto.randomUUID();
    this.userId = userId;
    this.user = user as UserReference;
    this.rating = rating;
    this.content = content;
    this.created = created ?? Timestamp.now();
    this.updated = updated ?? Timestamp.now();
    this.movieId = movieId;
    this.movie = movie as MovieReference;
  }

  toFirestore(): FirestoreReview {
    return {
      userId: this.userId,
      user: Object.assign({}, this.user),
      rating: this.rating,
      content: this.content,
      created: this.created,
      updated: this.updated,
      movieId: this.movieId,
      movie: Object.assign({}, this.movie),
    };
  }
}

export const reviewConverter: FirestoreDataConverter<Review> = {
  toFirestore(review: Review): DocumentData {
    return review.toFirestore();
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Review {
    const data = snapshot.data();
    const { userId, user, rating, content, created, updated, movieId, movie } =
      data as FirestoreReview;

    return new Review({
      id: snapshot.id,
      userId,
      user: user as UserReference,
      rating,
      content,
      created,
      updated,
      movieId,
      movie: movie as MovieReference,
    });
  },
};
