import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

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
const auth = getAuth(firebaseApp);
const authGoogle = new GoogleAuthProvider();
const authFacebook = new FacebookAuthProvider();

export { db, auth, authGoogle, authFacebook };
