import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let auth: any;
let db: any;

// Initialize Firebase Admin SDK only when called (lazy initialization)
function initFirebaseAdmin() {
  if (auth && db) {
    return { auth, db };
  }

  const apps = getApps();

  if (!apps.length) {
    // Only initialize if env vars are available
    if (
      process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY
    ) {
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        }),
      });
    }
  }

  auth = getAuth();
  db = getFirestore();

  return { auth, db };
}

// Lazy export - will initialize on first access
export const getFirebaseServices = () => initFirebaseAdmin();
