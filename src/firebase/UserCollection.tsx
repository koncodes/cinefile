import { User, userConverter } from "@/entities/User";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, userStorage } from "../firebase";

export default class UserCollection {
  static COLLECTION_NAME = "cinefileUsers";

  static async getUser(uid: string) {
    const userDocRef = UserCollection.getUserDoc(uid);
    const userDocSnap = await getDoc(userDocRef.withConverter(userConverter));
    return userDocSnap.data();
  }

  static async findUser(email: string) {
    const usersCollection = UserCollection.getUsersCollection();
    const userQuery = query(
      usersCollection,
      where("email", "==", email)
    ).withConverter(userConverter);
    const userDocsSnap = await getDocs(userQuery);
    return userDocsSnap.docs[0]?.data();
  }

  static syncUser(uid: string, user: User) {
    const userDocRef = UserCollection.getUserDoc(uid);
    onSnapshot(userDocRef.withConverter(userConverter), (doc) => {
      Object.assign(user, doc.data());
    });
  }

  // static async setUser(user: User) {
  //   const userDocRef = UserCollection.getUserDoc(user.id);
  //   return setDoc(userDocRef.withConverter(userConverter), user);
  // }

  static async setUser(user: User) {
    const userDocRef = UserCollection.getUserDoc(user.id);
    try {
      await setDoc(userDocRef.withConverter(userConverter), user);
      console.log("User successfully written to Firestore:", user);
    } catch (error) {
      console.error("🔥 Firestore write error:", error);
    }
  }

  static async getUsers() {
    const usersCollection = UserCollection.getUsersCollection();
    const usersSnapshot = await getDocs(
      usersCollection.withConverter(userConverter)
    );
    return usersSnapshot.docs.map((doc) => doc.data());
  }

  static getUserDoc(uid: string) {
    return doc(UserCollection.getUsersCollection(), uid).withConverter(
      userConverter
    );
  }

  static getUsersCollection() {
    return collection(db, UserCollection.COLLECTION_NAME);
  }

  static async updateUserProfile(
    user: User,
    profileUpdates: { image?: File; avatarURL?: string }
  ) {
    const userDocRef = this.getUserDoc(user.id);

    if (profileUpdates.image) {
      const allowedTypes = ["jpg", "jpeg", "png", "gif", "webp"];
      const extension =
        profileUpdates.image.name.toLowerCase().split(".").pop() || "";

      if (!allowedTypes.includes(extension)) {
        console.error("Invalid file type.");
        throw new Error("Invalid file type.");
      }

      if (profileUpdates.image.size > 500 * 1024) {
        console.error("File too large. 500KB max.");
        throw new Error("File too large. 500KB max.");
      }

      const imageRef = ref(userStorage, `${user.id}`);
      const snapshot = await uploadBytes(imageRef, profileUpdates.image);
      profileUpdates.avatarURL = await getDownloadURL(snapshot.ref);
      delete profileUpdates.image;
    }

    await updateDoc(userDocRef, profileUpdates);
    console.log("User profile updated successfully.");
  }
}
