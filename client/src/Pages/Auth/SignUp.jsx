import { use } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import Swal from 'sweetalert2';

const SignUp = () => {
  const { createUser } = use(AuthContext);

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;

    /** 2. Get Form Data With FormData */
    const formData = new FormData(form);
    const { email, password, ...userProfile } = Object.fromEntries(
      formData.entries(),
    );
    console.log(userProfile);

    /** Create User With Email & Password */
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);

        /** Save Profile Info in the Database */
        fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userProfile),
        })
          .then(async (res) => {
            const data = await res.json();
            if (!res.ok) {
              // error handle
              Swal.fire({
                title: 'Error!',
                text: data.message || 'Something went wrong',
                icon: 'error',
                draggable: true,
              });
              throw new Error(data.message || 'Server Error');
            }
            return data;
          })
          .then((data) => {
            console.log('After Created', data);
            if (data.insertedId) {
              const localCreatedTime = new Date().toLocaleString();
              Swal.fire({
                title: 'User Created Successfully!',
                text: `Created at: ${localCreatedTime}`,
                icon: 'success',
                draggable: true,
              });
            }
          });
        form.reset();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <div className='card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl'>
      <div className='card-body'>
        <h1 className='text-3xl font-bold text-center'>Sign Up Now!</h1>
        <form
          onSubmit={handleSignUp}
          className='fieldset'
        >
          <label className='label'>Name</label>
          <input
            type='text'
            name='name'
            className='input'
            placeholder='Name'
          />
          <label className='label'>Addresses</label>
          <input
            type='text'
            name='addresses'
            className='input'
            placeholder='Addresses'
          />
          <label className='label'>Phone</label>
          <input
            type='text'
            name='phone'
            className='input'
            placeholder='Phone'
          />
          <label className='label'>Photo URL</label>
          <input
            type='text'
            name='photo'
            className='input'
            placeholder='Photo URL'
          />
          <label className='label'>Email</label>
          <input
            type='email'
            name='email'
            className='input'
            placeholder='Email'
          />
          <label className='label'>Password</label>
          <input
            type='password'
            name='password'
            className='input'
            placeholder='Password'
          />
          <div>
            <a className='link link-hover'>Forgot password?</a>
          </div>
          <button className='btn btn-neutral mt-4'>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
