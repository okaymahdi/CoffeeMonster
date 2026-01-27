import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import AddCoffee from '../Components/Coffee/AddCoffee';
import CoffeeDetails from '../Components/Coffee/CoffeeDetails';
import UpdateCoffee from '../Components/Coffee/UpdateCoffee';
import Main from '../Layouts/Main';
import HomePage from '../Pages/Home/HomePage';

const Router = createBrowserRouter([
  {
    path: '/',
    Component: Main,
    children: [
      {
        index: true,
        loader: async () => {
          try {
            const res = await fetch('http://localhost:3000/coffees');
            if (!res.ok) throw new Error('Failed to fetch coffees');
            const data = await res.json();
            return data;
          } catch (error) {
            console.error('Loader error:', error);
            return [];
          }
        },
        Component: HomePage,
      },
      {
        path: 'add-coffee',
        Component: AddCoffee,
      },
      {
        path: 'coffee/:id',
        loader: async ({ params }) => {
          try {
            const res = await fetch(
              `http://localhost:3000/coffee/${params.id}`,
            );
            if (!res.ok) throw new Error('Failed to fetch coffees');
            const data = await res.json();
            return data;
          } catch (error) {
            console.error('Loader error:', error);
            return [];
          }
        },
        Component: CoffeeDetails,
      },

      {
        path: '/update-coffee/:id',
        loader: async ({ params }) => {
          try {
            const res = await fetch(
              `http://localhost:3000/coffee/${params.id}`,
            );
            if (!res.ok) throw new Error('Failed to fetch coffees');
            const data = await res.json();
            return data;
          } catch (error) {
            console.error('Loader error:', error);
            return [];
          }
        },
        Component: UpdateCoffee,
      },
    ],
  },
]);

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <RouterProvider
        router={Router}
        hydrateFallbackElement={<div>Loading route data...</div>}
      />
    </Suspense>
  );
};

export { AppRouter };
