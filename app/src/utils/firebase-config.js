import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyA_aOpIV-A16v5VraP8dohlQ6IlrtbE8x0',
  authDomain: 'flixxit-mern.firebaseapp.com',
  projectId: 'flixxit-mern',
  storageBucket: 'flixxit-mern.appspot.com',
  messagingSenderId: '276879342401',
  appId: '1:276879342401:web:150cc9c928d491835cbfc0',
  measurementId: 'G-QGJ6C4S428',
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
