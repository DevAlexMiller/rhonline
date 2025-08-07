import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Login from './pages/Login';
import Home from './pages/Home';
import Password from './pages/NewPassword';
import MyStyles from './styles/globalStyles';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/NewPassword",
    element: <Password />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyStyles/>
    <RouterProvider router={router} />
  </StrictMode>,
);
