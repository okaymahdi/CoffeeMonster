const SignIn = () => {
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const restFormData = Object.fromEntries(formData.entries());
    console.log(formData, restFormData);
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
