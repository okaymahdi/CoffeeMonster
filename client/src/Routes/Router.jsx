import { createBrowserRouter, RouterProvider } from 'react-router';
import AddCoffee from '../Components/Coffee/AddCoffee';
import Main from '../Layouts/Main';
import HomePage from '../Pages/Home/HomePage';

const Router = createBrowserRouter([
  {
    path: '/',
    Component: Main,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: 'add-coffee',
        Component: AddCoffee,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={Router} />;
};

export { AppRouter };
