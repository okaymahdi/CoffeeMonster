import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBMv4Rvv9cvPYHwQsVJOyA9vLdCJRfsvXc',
  authDomain: 'coffeemonster-4bc2d.firebaseapp.com',
  projectId: 'coffeemonster-4bc2d',
  storageBucket: 'coffeemonster-4bc2d.firebasestorage.app',
  messagingSenderId: '610218398686',
  appId: '1:610218398686:web:ede2c484fccb18d91a834f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
