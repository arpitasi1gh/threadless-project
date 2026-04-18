import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const isConfigured = Object.values(firebaseConfig).every(Boolean)
const app = isConfigured ? initializeApp(firebaseConfig) : null
const analytics = app ? getAnalytics(app) : null
const auth = app ? getAuth(app) : null
const db = app ? getFirestore(app) : null;

const requireFirebase = (action) => {
  if (!auth) {
    const missing = Object.entries(firebaseConfig).filter(([key, value]) => !value).map(([key]) => key.replace('VITE_FIREBASE_', '').toLowerCase());
    throw new Error(
      `Firebase is not configured. Missing environment variables: ${missing.join(', ')}. Add them to your .env file and restart the dev server to ${action}.`,
    )
  }
}

export const signInWithGoogle = async () => {
  requireFirebase('sign in with Google')
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })
  return signInWithPopup(auth, provider)
}

export const sendPasswordReset = async (email) => {
  requireFirebase('send a password reset email')
  return sendPasswordResetEmail(auth, email)
}
