import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase web config is not a secret - it just identifies which project to talk
// to. Access control is enforced by Firestore Security Rules, not by hiding this
// object. Replace the placeholders below with the values from
// Firebase Console -> Project settings -> Your apps -> SDK setup and configuration.
const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyDfVh_z8sKpkwYQAbupSDpBTkQJAgR7cSg',
  authDomain: 'cube-app-7da09.firebaseapp.com',
  projectId: 'cube-app-7da09',
  storageBucket: 'cube-app-7da09.firebasestorage.app',
  messagingSenderId: '825602683955',
  appId: '1:825602683955:web:290b1c53aaffd64be51f46',
};

export const firebaseConfigured = firebaseConfig.apiKey !== 'PLACEHOLDER_API_KEY';

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
