const AddCoffee = () => {
  const handleAddCoffee = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const form = e.target;
    const name = form.name.value;
    const chef = form.chef.value;
    const supplier = form.supplier.value;
    const taste = form.taste.value;
    const category = form.category.value;
    const details = form.details.value;
    const photo = form.photo.value;
    const newCoffee = { name, chef, supplier, taste, category, details, photo };
    console.log(newCoffee);

    const formData = new FormData(form);
    console.log(...formData.entries());

    const coffeeData = Object.fromEntries(formData.entries());
    console.log(coffeeData);

    /** Send Coffee Data to the Server */
    fetch('http://localhost:3000/add-coffee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coffeeData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert('Coffee Added Successfully');
          console.log('After Adding Coffee', data);
          form.reset();
        }
      });
  };
  return (
    <div className='max-w-330 mx-auto px-28 py-17.5 rounded-md'>
      <div className='p-20.5 text-center space-y-12'>
        <h1 className='text-6xl'>Add Coffee</h1>
        <p className='text-lg'>
          It is a long established fact that a reader will be distraceted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using Content here.
        </p>
      </div>

      <div>
        <form onSubmit={handleAddCoffee}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4'>
              <label className='label text-xl font-semibold text-title'>
                Name
              </label>
              <input
                type='text'
                className='input w-full'
                name='name'
                placeholder='Enter coffee name'
              />
            </fieldset>
            <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4'>
              <label className='label text-xl font-semibold text-title'>
                Chef
              </label>
              <input
                type='text'
                className='input w-full'
                name='chef'
                placeholder='Enter Coffee Chef'
              />
            </fieldset>
            <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4'>
              <label className='label text-xl font-semibold text-title'>
                Supplier
              </label>
              <input
                type='text'
                className='input w-full'
                name='supplier'
                placeholder='Enter Coffee Supplier'
              />
            </fieldset>
            <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4'>
              <label className='label text-xl font-semibold text-title'>
                Taste
              </label>
              <input
                type='text'
                className='input w-full'
                name='taste'
                placeholder='Enter Coffee Taste'
              />
            </fieldset>
            <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4'>
              <label className='label text-xl font-semibold text-title'>
                Category
              </label>
              <input
                type='text'
                className='input w-full'
                name='category'
                placeholder='Enter Coffee Category'
              />
            </fieldset>
            <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4'>
              <label className='label text-xl font-semibold text-title'>
                Details
              </label>
              <input
                type='text'
                className='input w-full'
                name='details'
                placeholder='Enter Coffee Details'
              />
            </fieldset>
          </div>
          <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4 my-6'>
            <label className='label text-xl font-semibold text-title'>
              Photo
            </label>
            <input
              type='text'
              className='input w-full'
              name='photo'
              placeholder='Enter Coffee Photo URL'
            />
          </fieldset>
          <input
            type='submit'
            className='btn btn-dash w-full'
            value='Add Coffee'
          />
        </form>
      </div>
    </div>
  );
};

export default AddCoffee;
