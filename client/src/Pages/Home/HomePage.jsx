import { useLoaderData } from 'react-router';
import CoffeeCard from '../../Components/Coffee/CoffeeCard';

const HomePage = () => {
  const coffees = useLoaderData();

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 px-12 my-8'>
        {coffees.map((coffee) => (
          <CoffeeCard
            key={coffee._id}
            coffee={coffee}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
