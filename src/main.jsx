import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Login from './pages/Login';
import Home from './pages/Home';
import Password from './pages/NewPassword'; // Assumindo que o nome do arquivo/componente foi corrigido para Password
import ResetPassword from './pages/ResetPassword';
import NewUser from './pages/NewUser';
import MyStyles from './styles/globalStyles';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
// 🛑 Importe o novo componente de Wrapper
import SessionTimeoutWrapper from './components/Timeout/SessionTimeoutWrapper'; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, // Rota de login não protegida
  },
  {
    path: "/home",
    // 🛑 Rota Autenticada: Encapsulada no Wrapper
    element: <SessionTimeoutWrapper><Home /></SessionTimeoutWrapper>,
  },
  {
    path: "/newPassword",
    // 🛑 Rota Autenticada: Encapsulada no Wrapper
    element: <SessionTimeoutWrapper><Password /></SessionTimeoutWrapper>,
  },
  {
    path: "/resetPassword",
    // 🛑 Rota Autenticada: Encapsulada no Wrapper
    element: <SessionTimeoutWrapper><ResetPassword /></SessionTimeoutWrapper>
  },
  {
    path: "/newUser",
    // 🛑 Rota Autenticada: Encapsulada no Wrapper
    element: <SessionTimeoutWrapper><NewUser /></SessionTimeoutWrapper>
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyStyles/>
    <RouterProvider router={router} />
  </StrictMode>,
);