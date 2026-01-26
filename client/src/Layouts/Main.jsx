import { Outlet } from 'react-router';
import Header from '../Components/Shared/Header';

const Main = () => {
  return (
    <div>
      <Header />
      <div className='container mx-auto max-w-330'>
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
