# 1. Firebase configuration and initialization

```js
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
```

# 2. Contexts

```js
import { createContext } from 'react';

const AuthContext = createContext(null);

export { AuthContext };
```

# 3. Provider Initial

```js
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const userInfo = {
    name: 'John Doe'
    email: 'john@doe.com'
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;

```

# 4. Use Provider in Main

```js
const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <AuthProvider>
        <RouterProvider
          router={Router}
          hydrateFallbackElement={<div>Loading route data...</div>}
        />
      </AuthProvider>
    </Suspense>
  );
};
```

# 5. Use Context in Another File

```js
const SignUp = () => {
  const { name, email } = use(AuthContext);
  console.log({ name, email });
};
```

# 6. Function in Provider

## 6.1. Create User with Email & Password in [Provider]

```js
const createUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
const userInfo = {
  createUser,
};
```

## 6.2. Create User with Email & Password in [SignUp]

```js
const SignUp = () => {
  const { createUser } = use(AuthContext);

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;

    /** 1. Get Form Data from the Form Element */
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    /** 2. Get Form Data With FormData */
    const formData = new FormData(form);
    const newData = Object.fromEntries(formData.entries());
    console.log(newData);

    /** Destruct from FormData */
    const { email, password, ...userProfile } = Object.fromEntries(
      formData.entries(),
    );

    /** 3. Get Form Data from FormData */
    const emailData = formData.get('email');
    const passwordData = formData.get('password');
    console.log(emailData, passwordData);

    /** 4. Get Form Data from FormData */
    const emailData2 = formData.getAll('email')[0];
    const passwordData2 = formData.getAll('password')[0];
    console.log(emailData2, passwordData2);

    /** Create User With Email & Password */
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  <form onSubmit={handleSignUp}> ... </form>;
};
```

## 6.3.
