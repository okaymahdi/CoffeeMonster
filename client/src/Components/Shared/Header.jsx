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
              isActive ? 'text-yellow-500 mx-4' : 'mx-4'
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
