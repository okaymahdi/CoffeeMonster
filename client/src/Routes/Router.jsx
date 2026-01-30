import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import AddCoffee from '../Components/Coffee/AddCoffee';
import CoffeeDetails from '../Components/Coffee/CoffeeDetails';
import UpdateCoffee from '../Components/Coffee/UpdateCoffee';
import AuthProvider from '../Contexts/AuthProvider';
import Main from '../Layouts/Main';
import SignIn from '../Pages/Auth/SignIn';
import SignUp from '../Pages/Auth/SignUp';
import HomePage from '../Pages/Home/HomePage';
import Users from '../Pages/Users/Users';

const Router = createBrowserRouter([
  {
    path: '/',
    Component: Main,
    children: [
      {
        index: true,
        loader: async () => {
          try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/coffees`);
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
              `${import.meta.env.VITE_API_URL}/coffee/${params.id}`,
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
              `${import.meta.env.VITE_API_URL}/coffee/${params.id}`,
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
      {
        path: 'signup',
        Component: SignUp,
      },
      {
        path: 'signin',
        Component: SignIn,
      },
      {
        path: 'users',
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/users`),
        Component: Users,
      },
    ],
  },
]);

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <AuthProvider>
        <RouterProvider
          router={Router}
          hydrateFallbackElement={<div>Loading route data...</div>}
        />
      </AuthProvider>
    </Suspense>
  );
};

export { AppRouter };
