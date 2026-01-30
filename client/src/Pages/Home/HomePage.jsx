import { useState } from 'react';
import { useLoaderData } from 'react-router';
import CoffeeCard from '../../Components/Coffee/CoffeeCard';

const HomePage = () => {
  const initialCoffees = useLoaderData();
  const [coffees, setCoffees] = useState(initialCoffees);

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 px-12 my-8'>
        {coffees.map((coffee) => (
          <CoffeeCard
            key={coffee._id}
            coffee={coffee}
            coffees={coffees}
            setCoffees={setCoffees}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
