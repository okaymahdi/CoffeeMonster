import Swal from 'sweetalert2';

const AddCoffee = () => {
  const handleAddCoffee = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const form = e.target;
    const name = form.name.value;
    const chef = form.chef.value;
    const supplier = form.supplier.value;
    const taste = form.taste.value;
    const price = form.price.value;
    const details = form.details.value;
    const photo = form.photo.value;
    const newCoffee = { name, chef, supplier, taste, price, details, photo };
    console.log(newCoffee);

    const formData = new FormData(form);
    console.log(...formData.entries());

    const coffeeData = Object.fromEntries(formData.entries());
    console.log(coffeeData);

    /** Send Coffee Data to the Server */
    fetch('http://localhost:3000/add-coffee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(coffeeData),
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
        // Success
        if (data.insertedId) {
          const localCreatedTime = new Date(
            data.createdAt || Date.now(),
          ).toLocaleString();

          Swal.fire({
            title: 'Coffee Added Successfully!',
            text: `Created at: ${localCreatedTime}`,
            icon: 'success',
            draggable: true,
          });

          console.log('After Adding Coffee', data);
          form.reset();
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className=' container max-w-330 mx-auto px-28 py-17.5 rounded-md'>
      <div className='p-20.5 text-center space-y-12'>
        <h1 className='text-6xl '>Add Coffee</h1>
        <p className='text-lg '>
          It is a long established fact that a reader will be distraceted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using Content here.
        </p>
      </div>

      <div>
        <form onSubmit={handleAddCoffee}>
          <div className='grid grid-cols-2 gap-6'>
            <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4'>
              <label className='label text-xl font-semibold '>Name</label>
              <input
                type='text'
                className='input w-full'
                name='name'
                placeholder='Enter coffee name'
              />
            </fieldset>
            <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4'>
              <label className='label text-xl font-semibold '>Chef</label>
              <input
                type='text'
                className='input w-full'
                name='chef'
                placeholder='Enter Coffee Chef'
              />
            </fieldset>
            <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4'>
              <label className='label text-xl font-semibold '>Supplier</label>
              <input
                type='text'
                className='input w-full'
                name='supplier'
                placeholder='Enter Coffee Supplier'
              />
            </fieldset>
            <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4'>
              <label className='label text-xl font-semibold '>Taste</label>
              <input
                type='text'
                className='input w-full'
                name='taste'
                placeholder='Enter Coffee Taste'
              />
            </fieldset>
            <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4'>
              <label className='label text-xl font-semibold '>Price</label>
              <input
                type='number'
                className='input w-full'
                name='price'
                placeholder='Enter Coffee price'
              />
            </fieldset>
            <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4'>
              <label className='label text-xl font-semibold '>Details</label>
              <input
                type='text'
                className='input w-full'
                name='details'
                placeholder='Enter Coffee Details'
              />
            </fieldset>
          </div>
          <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4 my-6'>
            <label className='label text-xl font-semibold '>Photo</label>
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
