import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  /** Create User With Email & Password */
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  /** Delete User */
  const firebaseDeleteUser = async () => {
    if (!auth.currentUser) {
      console.log('No user logged in');
      return;
    }

    try {
      await deleteUser(auth.currentUser);
      console.log('User deleted');
    } catch (error) {
      console.error(error);
    }
  };
  const userInfo = {
    createUser,
    firebaseDeleteUser,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
