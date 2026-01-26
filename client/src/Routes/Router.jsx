import { createBrowserRouter, RouterProvider } from 'react-router';
import App from '../App';
import Main from '../Layouts/Main';

const Router = createBrowserRouter([
  {
    path: '/',
    Component: Main,
    children: [
      {
        index: true,
        Component: App,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={Router} />;
};

export { AppRouter };
