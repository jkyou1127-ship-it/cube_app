import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase web config is not a secret - it just identifies which project to talk
// to. Access control is enforced by Firestore Security Rules, not by hiding this
// object. Replace the placeholders below with the values from
// Firebase Console -> Project settings -> Your apps -> SDK setup and configuration.
const firebaseConfig: FirebaseOptions = {
  apiKey: 'PLACEHOLDER_API_KEY',
  authDomain: 'PLACEHOLDER.firebaseapp.com',
  projectId: 'PLACEHOLDER',
  storageBucket: 'PLACEHOLDER.appspot.com',
  messagingSenderId: 'PLACEHOLDER',
  appId: 'PLACEHOLDER',
};

export const firebaseConfigured = firebaseConfig.apiKey !== 'PLACEHOLDER_API_KEY';

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
