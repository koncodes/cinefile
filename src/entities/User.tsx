import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase/firestore";

export interface UserReference {
  id: string;
  displayName: string;
  email: string;
  avatarURL: string;
}

interface FirestoreUser {
  displayName: string;
  email: string;
  avatarURL: string;
}

export class User {
  readonly id: string;
  displayName: string;
  email: string;
  avatarURL: string;

  constructor({
    id,
    displayName = "Anonymous",
    email = "",
    avatarURL = "",
  }: Omit<Partial<FirestoreUser>, "id"> & { id: string }) {
    this.id = id;
    this.displayName = displayName;
    this.email = email;
    this.avatarURL = avatarURL;
  }

  exists(): boolean {
    return Boolean(this.id);
  }

  toFirestore(): FirestoreUser {
    return {
      displayName: this.displayName,
      email: this.email,
      avatarURL: this.avatarURL,
    };
  }
}

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user: User): DocumentData {
    return user.toFirestore();
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): User {
    const data = snapshot.data();
    const { displayName, email, avatarURL } = data as FirestoreUser;
    return new User({ id: snapshot.id, displayName, email, avatarURL });
  },
};
