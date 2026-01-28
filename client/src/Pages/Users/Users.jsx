import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { MdEdit, MdFolderDelete } from 'react-icons/md';
import { useLoaderData } from 'react-router';

const Users = () => {
  const initialUsers = useLoaderData();
  const [users, setUsers] = useState(initialUsers);
  console.log(initialUsers);

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
              <th></th>
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
                  <button className='btn btn-soft btn-error btn-xs'>
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
