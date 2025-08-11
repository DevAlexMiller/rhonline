import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Login from './pages/Login';
import Home from './pages/Home';
import Password from './pages/NewPassword';
import ResetPassword from './pages/ResetPassword';
import NewUser from './pages/NewUser';
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
    path: "/newPassword",
    element: <Password />,
  },
  {
    path: "/resetPassword",
    element: <ResetPassword />
  },
  {
    path: "/newUser",
    element: <NewUser />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyStyles/>
    <RouterProvider router={router} />
  </StrictMode>,
);
