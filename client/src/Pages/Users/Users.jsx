import { use, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { MdEdit, MdFolderDelete } from 'react-icons/md';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Contexts/AuthContext';

const Users = () => {
  const { firebaseDeleteUser } = use(AuthContext);
  const initialUsers = useLoaderData();
  const [users, setUsers] = useState(initialUsers);

  /** Delete User Handler */
  const handleDelete = (id) => {
    const userToDelete = users.find((user) => user._id === id);
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete user: ${userToDelete.email}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
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
            .then(async (data) => {
              console.log('After Deleted', data);
              if (data.deletedCount) {
                /** Delete User from Firebase */
                await firebaseDeleteUser();

                /** Update UI */
                const remainingUsers = users.filter((user) => user._id !== id);
                setUsers(remainingUsers);
              }
            });
        } catch (error) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: error.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        Swal.fire({
          title: `${userToDelete.email} deleted successfully!`,
          icon: 'success',
        });
      }
    });
  };

  return (
    <div>
      <h2 className='text-3xl'>
        Users: <span className='font-bold text-orange-400'>{users.length}</span>
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
                        {user?.photo &&
                        (() => {
                          try {
                            new URL(user.photo);
                            return true;
                          } catch {
                            return false;
                          }
                        })() ? (
                          <img
                            src={user.photo}
                            alt={user.name}
                            className='w-full h-full object-cover'
                          />
                        ) : (
                          <span className='flex items-center justify-center font-bold text-xl text-orange-400 uppercase bg-orange-50 mask mask-squircle h-12 w-12'>
                            {user?.name?.slice(0, 1)}
                          </span>
                        )}
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
