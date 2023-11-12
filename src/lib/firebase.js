import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "./firebase-config";

const app = initializeApp(firebaseConfig);
export const appStorage = getStorage(app)