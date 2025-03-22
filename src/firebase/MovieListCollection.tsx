import { MovieList, movieListConverter } from "@/entities/MovieList";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from ".";

export default class MovieListCollection {
  static COLLECTION_NAME = "cinefileMovieLists";

  static async getMovieListById(id: string) {
    const MovieListDocRef = MovieListCollection.getMovieListDoc(id);
    const MovieListDocSnap = await getDoc(
      MovieListDocRef.withConverter(movieListConverter)
    );
    return MovieListDocSnap.data();
  }

  static async getAllMovieLists() {
    const MovieListsCollection = MovieListCollection.getMovieListsCollection();
    const MovieListQuery = query(
      MovieListsCollection,
      where("privacy", "==", "public"),
      where("type", "==", "custom")
    ).withConverter(movieListConverter);
    const MovieListDocsSnap = await getDocs(MovieListQuery);
    return MovieListDocsSnap.docs.map((doc) => doc.data());
  }

  static async getAllMovieListsById(id: string) {
    const MovieListsCollection = MovieListCollection.getMovieListsCollection();
    const MovieListQuery = query(
      MovieListsCollection,
      where("userId", "==", id),
      where("privacy", "==", "public"),
      where("type", "==", "custom")
    ).withConverter(movieListConverter);
    const MovieListDocsSnap = await getDocs(MovieListQuery);
    return MovieListDocsSnap.docs.map((doc) => doc.data());
  }

  static async getWatchedMovieList(id: string) {
    const MovieListsCollection = MovieListCollection.getMovieListsCollection();
    const MovieListQuery = query(
      MovieListsCollection,
      where("userId", "==", id),
      where("type", "==", "watched")
    ).withConverter(movieListConverter);
    const MovieListDocSnap = await getDocs(MovieListQuery);
    return MovieListDocSnap?.docs[0]?.data();
  }

  static async getToWatchMovieList(id: string) {
    const MovieListsCollection = MovieListCollection.getMovieListsCollection();
    const MovieListQuery = query(
      MovieListsCollection,
      where("userId", "==", id),
      where("type", "==", "toWatch")
    ).withConverter(movieListConverter);
    const MovieListDocSnap = await getDocs(MovieListQuery);
    return MovieListDocSnap?.docs[0]?.data();
  }

  static async getMovieListsByMovie(movieId: string) {
    const MovieListsCollection = MovieListCollection.getMovieListsCollection();
    const MovieListQuery = query(
      MovieListsCollection,
      where("movieIds", "array-contains", movieId),
      where("privacy", "==", "public"),
      where("type", "==", "custom")
    ).withConverter(movieListConverter);
    const MovieListDocsSnap = await getDocs(MovieListQuery);
    return MovieListDocsSnap.docs.map((doc) => doc.data());
  }

  static async setMovieList(MovieList: MovieList) {
    const MovieListDocRef = MovieListCollection.getMovieListDoc(MovieList.id);
    return setDoc(MovieListDocRef.withConverter(movieListConverter), MovieList);
  }
  static async updateMovieList(movieList: MovieList) {
    const movieListDocRef = this.getMovieListDoc(movieList.id);
    const movieListData = movieList.toFirestore() as { [key: string]: any };
    await updateDoc(movieListDocRef, movieListData);
    console.log("MovieList updated successfully.");
  }

  static async deleteMovieList(id: string) {
    try {
      const movieListDocRef = this.getMovieListDoc(id);
      await deleteDoc(movieListDocRef);
    } catch (error) {
      console.error("Error deleting movie list:", error);
    }
  }

  static getMovieListDoc(id: string) {
    return doc(MovieListCollection.getMovieListsCollection(), id).withConverter(
      movieListConverter
    );
  }

  static getMovieListsDocs() {
    return getDocs(MovieListCollection.getMovieListsCollection());
  }

  static getMovieListsCollection() {
    return collection(db, MovieListCollection.COLLECTION_NAME);
  }
}
