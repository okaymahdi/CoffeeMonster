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
    firebaseDeleteUser,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
