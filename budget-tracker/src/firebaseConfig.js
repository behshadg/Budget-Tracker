// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDRIZ4nOgWKUZaMYrp3VQ0ydgk7QsphbSw',

  authDomain: 'budget-tracker-455c2.firebaseapp.com',

  projectId: 'budget-tracker-455c2',

  storageBucket: 'budget-tracker-455c2.appspot.com',

  messagingSenderId: '479018790686',

  appId: '1:479018790686:web:d24a8d59fb2ba0d644630f',

  measurementId: 'G-1M7N14NGVP',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
