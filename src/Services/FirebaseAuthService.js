import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../main";

class FirebaseAuthService {
  constructor() {
    this.auth = auth;
  }

  async signIn(email, password) {
    try {
      const attempt = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return attempt;
    } catch (error) {
      console.error("Error signing in:", error);
      return null;
    }
  }

  async signUp(email, password) {
    try {
      const attempt = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return attempt;
    } catch (error) {
      console.error("Error signing up:", error);
      return null;
    }
  }
}

export default FirebaseAuthService;
