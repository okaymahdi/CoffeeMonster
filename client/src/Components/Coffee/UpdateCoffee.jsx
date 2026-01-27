import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const UpdateCoffee = () => {
  const { _id, name, quantity, supplier, taste, price, details, photo } =
    useLoaderData();

  const handleUpdateCoffee = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedCoffee = Object.fromEntries(formData.entries());
    console.log(updatedCoffee);

    /** Send Update Request to the Server */
    fetch(`http://localhost:3000/coffee/${_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCoffee),
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
        if (data.modifiedCount > 0) {
          const updatedTime = new Date(
            data.updatedAt || Date.now(),
          ).toLocaleString();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Coffee Updated Successfully!',
            text: `Updated at: ${updatedTime}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div className=' container max-w-330 mx-auto px-28 py-17.5 rounded-md'>
      <div className='p-20.5 text-center space-y-12'>
        <h1 className='text-6xl '>Update Coffee</h1>
        <p className='text-lg '>
          It is a long established fact that a reader will be distraceted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using Content here.
        </p>
      </div>

      <div>
        <form onSubmit={handleUpdateCoffee}>
          <div className='grid grid-cols-2 gap-6'>
            <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4'>
              <label className='label text-xl font-semibold '>Name</label>
              <input
                type='text'
                className='input w-full'
                name='name'
                placeholder='Enter coffee name'
                defaultValue={name}
              />
            </fieldset>
            <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4'>
              <label className='label text-xl font-semibold '>Quantity</label>
              <input
                type='number'
                className='input w-full'
                name='quantity'
                placeholder='Enter Coffee Quantity'
                defaultValue={quantity}
              />
            </fieldset>
            <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4'>
              <label className='label text-xl font-semibold '>Supplier</label>
              <input
                type='text'
                className='input w-full'
                name='supplier'
                placeholder='Enter Coffee Supplier'
                defaultValue={supplier}
              />
            </fieldset>
            <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4'>
              <label className='label text-xl font-semibold '>Taste</label>
              <input
                type='text'
                className='input w-full'
                name='taste'
                placeholder='Enter Coffee Taste'
                defaultValue={taste}
              />
            </fieldset>
            <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4'>
              <label className='label text-xl font-semibold '>Price</label>
              <input
                type='number'
                className='input w-full'
                name='price'
                placeholder='Enter Coffee price'
                defaultValue={price}
              />
            </fieldset>
            <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4'>
              <label className='label text-xl font-semibold '>Details</label>
              <input
                type='text'
                className='input w-full'
                name='details'
                placeholder='Enter Coffee Details'
                defaultValue={details}
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
              defaultValue={photo}
            />
          </fieldset>
          <input
            type='submit'
            className='btn btn-dash w-full'
            value='Update Coffee'
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateCoffee;
