import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAvhj7HmNRyplLoflMSlYXk3XcwJKUL8hc',
  authDomain: 'tcc-app-60603.firebaseapp.com',
  databaseURL: 'https://tcc-app-60603-default-rtdb.firebaseio.com',
  projectId: 'tcc-app-60603',
  storageBucket: 'tcc-app-60603.appspot.com',
  messagingSenderId: '332120749747',
  appId: '1:332120749747:web:d6c97eabc564b3a242a2c6',
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };
