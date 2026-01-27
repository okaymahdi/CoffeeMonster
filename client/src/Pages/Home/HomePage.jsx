import { useLoaderData } from 'react-router';

const HomePage = () => {
  const data = useLoaderData();
  console.log('Home Page Data:', data);
  return <div>HomePage</div>;
};

export default HomePage;
