import { useQuery } from '@tanstack/react-query';
import { FaEye } from 'react-icons/fa';
import { MdEdit, MdFolderDelete } from 'react-icons/md';

const AllUsers = () => {
  // const { firebaseDeleteUser } = use(AuthContext);
  // const [users, setUsers] = useState([]);

  /** Tanstack Query */
  const {
    isPending,
    data: users,
    isError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`);
      const data = await res.json();
      return data;
    },
  });

  /** Data Received with Fetch */
  // useEffect(() => {
  //   fetch('')
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);

  /** Data Received with Axios */
  // useEffect(() => {
  //   axios.get('').then((data) => console.log(data));
  // }, []);

  /** Call API */
  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_URL}/users`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUsers(data);
  //     });
  // }, []);

  /** Delete User Handler */
  const handleDelete = () => {};

  if (isPending) {
    return <progress className='progress w-56'></progress>;
  }

  if (isError) {
    return <h2 className='text-3xl text-red-500'>{isError.message}</h2>;
  }
  return (
    <div>
      <h2 className='text-3xl'>
        Users:{' '}
        <span className='font-bold text-orange-400'>{users?.length}</span>
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
            {users?.map((user, index) => (
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

export default AllUsers;
