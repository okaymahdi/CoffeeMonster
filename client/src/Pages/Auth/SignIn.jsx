import { use } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';

const SignIn = () => {
  const { signInUser } = use(AuthContext);
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const restFormData = Object.fromEntries(formData.entries());
    console.log(formData, restFormData);

    /** Send Sign In Request to Firebase */
    signInUser(restFormData.email, restFormData.password)
      .then((result) => {
        console.log(result.user);

        /** Update Last Sign In Time in the Database */
        const signInInfo = {
          email: restFormData.email,
          lastSignInTime: result?.user?.metadata?.lastSignInTime,
        };
        console.log(signInInfo);
        fetch(`${import.meta.env.VITE_API_URL}/users`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signInInfo),
        })
          .then(async (res) => {
            const data = await res.json();
            if (!res.ok) {
              throw new Error(data.message || 'Failed to fetch users');
            }
            return data;
          })
          .then((data) => {
            console.log('Updated Last Sign In Time:', data);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className='card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl'>
      <div className='card-body'>
        <h1 className='text-3xl font-bold text-center'>Sign In Now!</h1>
        <form
          onSubmit={handleSignIn}
          className='fieldset'
        >
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
          <button className='btn btn-neutral mt-4'>Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
