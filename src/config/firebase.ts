// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseOptions } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const getEnvVar = (
  key: keyof ImportMetaEnv,
  options?: { required?: boolean }
): string => {
  const value = import.meta.env[key];
  if (!value) {
    const message = `[Firebase] Missing environment variable ${key}. Please define it in your .env file.`;
    if (options?.required) {
      console.error(message);
    } else {
      console.warn(message);
    }
  }
  return value ?? "";
};

const firebaseConfig: FirebaseOptions = {
  apiKey: getEnvVar("VITE_FIREBASE_API_KEY", { required: true }),
  authDomain: getEnvVar("VITE_FIREBASE_AUTH_DOMAIN", { required: true }),
  projectId: getEnvVar("VITE_FIREBASE_PROJECT_ID", { required: true }),
  storageBucket: getEnvVar("VITE_FIREBASE_STORAGE_BUCKET", { required: true }),
  messagingSenderId: getEnvVar("VITE_FIREBASE_MESSAGING_SENDER_ID", {
    required: true,
  }),
  appId: getEnvVar("VITE_FIREBASE_APP_ID", { required: true }),
  measurementId: getEnvVar("VITE_FIREBASE_MEASUREMENT_ID"),
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only in browser environment
let analytics: ReturnType<typeof getAnalytics> | undefined;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Initialize Firebase Auth
const auth = getAuth(app);

export { app, analytics, auth, RecaptchaVerifier, signInWithPhoneNumber };
export type { ConfirmationResult };
