import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  /** Create User With Email & Password */
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  /** Sign In User */
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  /** Delete User */
  const firebaseDeleteUser = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.log('No user logged in');
      return;
    }

    deleteUser(user)
      .then(() => {
        console.log('User deleted successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const userInfo = {
    createUser,
    signInUser,
    firebaseDeleteUser,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
