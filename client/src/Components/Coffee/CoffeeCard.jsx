import { FaEye } from 'react-icons/fa';
import { MdEdit, MdFolderDelete } from 'react-icons/md';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const CoffeeCard = ({ coffee, coffees, setCoffees }) => {
  const { name, chef, price, photo, _id } = coffee;

  const handleDelete = (_id) => {
    try {
      console.log(_id);
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(result.isConfirmed);

          /** Send Delete Request to Server */
          fetch(`http://localhost:3000/coffee/${_id}`, {
            method: 'DELETE',
          })
            .then((res) => res.json())
            .then((data) => {
              console.log('DELETE RESPONSE:', data);
              if (data.deletedCount > 0) {
                Swal.fire({
                  title: 'Deleted!',
                  text: 'Your Coffee has been Deleted.',
                  icon: 'success',
                });
                const remaining = coffees.filter((c) => c._id !== _id);
                setCoffees(remaining); // ✅ UI update হবে
              }
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='card card-side bg-base-100 shadow-sm border'>
      <figure>
        <img
          src={photo}
          alt={name}
        />
      </figure>
      <div className='flex justify-around w-full mt-6'>
        <div>
          <h2 className=''>{name}</h2>
          <p>
            <strong>Chef:</strong> {chef}
          </p>
          <p>
            <strong>Price:</strong> {price} Taka
          </p>
        </div>
        <div className='card-actions justify-end'>
          <div className='join join-vertical space-y-4'>
            <Link to={`/coffee/${_id}`}>
              <button className='btn join-item bg-orange-400'>
                <FaEye size={20} />
              </button>
            </Link>
            <Link to={`/update-coffee/${_id}`}>
              <button className='btn join-item bg-green-500'>
                <MdEdit size={20} />
              </button>
            </Link>
            <button
              onClick={() => handleDelete(_id)}
              className='btn join-item bg-red-500'
            >
              <MdFolderDelete size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
