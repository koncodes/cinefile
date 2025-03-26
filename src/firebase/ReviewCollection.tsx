import { Review, reviewConverter } from "@/entities/Review";
import {
  addDoc,
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

export default class ReviewCollection {
  static COLLECTION_NAME = "cinefileReviews";

  static async getReviewById(id: string) {
    const reviewDocRef = ReviewCollection.getReviewDoc(id);
    const reviewsSnapshot = await getDoc(
      reviewDocRef.withConverter(reviewConverter)
    );
    return reviewsSnapshot.data();
  }

    static async getAllReviews() {
      const reviewsCollection = ReviewCollection.getreviewsCollection();
      const reviewDocsSnap = await getDocs(
        reviewsCollection.withConverter(reviewConverter)
      );
      return reviewDocsSnap.docs.map((doc) => doc.data());
    }

  static async getAllReviewsById(id: string) {
    const reviewsCollection = ReviewCollection.getreviewsCollection();
    const reviewQuery = query(
      reviewsCollection,
      where("userId", "==", id)
    ).withConverter(reviewConverter);
    const reviewDocsSnap = await getDocs(reviewQuery);
    return reviewDocsSnap.docs.map((doc) => doc.data());
  }

  static async getReviewsByMovie(movieId: string) {
    const reviewsCollection = ReviewCollection.getreviewsCollection();
    const reviewQuery = query(
      reviewsCollection,
      where("movieId", "==", movieId)
    ).withConverter(reviewConverter);
    const reviewDocsSnap = await getDocs(reviewQuery);
    return reviewDocsSnap.docs.map((doc) => doc.data());
  }

  static async setReview(Review: Review) {
    const reviewDocRef = ReviewCollection.getReviewDoc(Review.id);
    await setDoc(reviewDocRef.withConverter(reviewConverter), Review);
    console.log("Review added successfully.");
  }

  static async addReview(Review: Review) {
    const reviewDocRef = await addDoc(
      ReviewCollection.getreviewsCollection(),
      Review.toFirestore()
    );
    console.log("Review added successfully with ID:", reviewDocRef.id);
  }

  static async updateReview(review: Review) {
    const reviewDocRef = this.getReviewDoc(review.id);
    const reviewData = review.toFirestore() as { [key: string]: any };
    await updateDoc(reviewDocRef, reviewData);
    console.log("Review updated successfully.");
  }

  static async deleteReview(id: string) {
    try {
      const reviewDocRef = this.getReviewDoc(id);
      await deleteDoc(reviewDocRef);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  }

  static getReviewDoc(id: string) {
    return doc(ReviewCollection.getreviewsCollection(), id).withConverter(
      reviewConverter
    );
  }

  static getReviewsDocs() {
    return getDocs(ReviewCollection.getreviewsCollection());
  }

  static getreviewsCollection() {
    return collection(db, ReviewCollection.COLLECTION_NAME);
  }
}
