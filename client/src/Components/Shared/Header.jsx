import { NavLink } from 'react-router';

const navLinks = [
  {
    id: 1,
    label: 'Home',
    path: '/',
  },
  {
    id: 2,
    label: 'Add Coffee',
    path: '/add-coffee',
  },
  {
    id: 3,
    label: 'Sign Up',
    path: '/signup',
  },
  {
    id: 4,
    label: 'Sign In',
    path: '/signin',
  },
  {
    id: 5,
    label: 'Users',
    path: '/users',
  },
  {
    id: 6,
    label: 'All Users',
    path: '/all-users',
  },
];

const Header = () => {
  return (
    <div>
      <nav className='flex justify-center items-center h-20 '>
        {navLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.path}
            className={({ isActive }) =>
              isActive ? 'text-orange-500 mx-4' : 'mx-4'
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Header;
