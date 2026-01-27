import { useLoaderData } from 'react-router';

const CoffeeDetails = () => {
  const initialCoffee = useLoaderData();
  console.log(initialCoffee);
  return (
    <div>
      CoffeeDetails
      <button
        className='btn'
        onClick={() => window.history.back()}
      >
        Back
      </button>
    </div>
  );
};

export default CoffeeDetails;
