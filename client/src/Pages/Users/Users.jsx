import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { MdEdit, MdFolderDelete } from 'react-icons/md';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const Users = () => {
  const initialUsers = useLoaderData();
  const [users, setUsers] = useState(initialUsers);
  console.log(initialUsers);

  /** Delete User Handler */
  const handleDelete = (id) => {
    try {
      console.log('Delete User with ID:', id);
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
          fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE',
          })
            .then(async (res) => {
              const data = await res.json();
              if (!res.ok) {
                // error handle
                Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: data.message || 'Something went wrong',
                  showConfirmButton: false,
                  timer: 1500,
                });
                throw new Error(data.message || 'Server Error');
              }
              return data;
            })
            .then((data) => {
              console.log('DELETE RESPONSE:', data);
              if (data.deletedCount > 0) {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: data.message || 'User Deleted Successfully!',
                  showConfirmButton: false,
                  timer: 1500,
                });
                /** Remove the User from the State and Update UI */
                const remaining = users.filter((user) => user._id !== id);
                setUsers(remaining); // ✅ UI update হবে
              }
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className='text-3xl'>
        Users:{' '}
        <span className='font-bold text-orange-400'>{initialUsers.length}</span>
      </h2>

      <div className='overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>No</label>
              </th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Dynamic Row */}
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>
                  <label>{index + 1}</label>
                </th>
                <td>
                  <div className='flex items-center gap-3'>
                    <div className='avatar'>
                      <div className='mask mask-squircle h-12 w-12'>
                        <img
                          src={user.photo}
                          alt={user.name}
                        />
                      </div>
                    </div>
                    <div>
                      <div className='font-bold'>{user.name}</div>
                      <div className='text-sm opacity-50'>{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>{user.addresses}</td>
                <td>{user.phone}</td>
                <th className='flex gap-2'>
                  <button className='btn btn-soft btn-primary btn-xs'>
                    <FaEye size={20} />
                  </button>
                  <button className='btn btn-soft btn-accent btn-xs'>
                    <MdEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className='btn btn-soft btn-error btn-xs'
                  >
                    <MdFolderDelete size={20} />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
