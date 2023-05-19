import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDfnvTkBjKSic1HNSbt5lJFX8esRlWX8oU",
  authDomain: "reviva-3fc67.firebaseapp.com",
  projectId: "reviva-3fc67",
  storageBucket: "reviva-3fc67.appspot.com",
  messagingSenderId: "315573433440",
  appId: "1:315573433440:web:21a249609c3015b6e63f05"
};

const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp)

  export { db, auth };