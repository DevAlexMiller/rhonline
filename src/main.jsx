import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet, useNavigate, useLocation } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Password from './pages/NewPassword'; 
import ResetPassword from './pages/ResetPassword';
import NewUser from './pages/NewUser';
import Perfil from './pages/Perfil';
import MyStyles from './styles/globalStyles';
import SessionTimeoutWrapper from './components/Timeout/SessionTimeoutWrapper';

const ProtectedLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Leitura dinâmica do token a cada mudança de rota
    const token = localStorage.getItem('authToken');
    const cpfAsPassword = localStorage.getItem('CPF_AS_PASSWORD') === 'true';

    useEffect(() => {
        // Se não houver token, expulsa para o login
        if (!token) {
            navigate('/', { replace: true });
            return;
        }

        // Se houver token e forçar troca de senha
        if (cpfAsPassword && location.pathname !== '/newPassword') {
            navigate('/newPassword', { replace: true });
        }
    }, [token, cpfAsPassword, location.pathname, navigate]);

    // Se não houver token, não renderiza nada nas rotas filhas
    if (!token) return null;

    return (
        <SessionTimeoutWrapper>
            <Outlet />
        </SessionTimeoutWrapper>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />, // Página acessível sem token
    },
    {
        element: <ProtectedLayout />, // Componente pai que protege os filhos
        children: [
            { path: "/home", element: <Home /> },
            { path: "/newPassword", element: <Password /> },
            { path: "/resetPassword", element: <ResetPassword /> },
            { path: "/newUser", element: <NewUser /> },
            { path: "/perfil", element: <Perfil /> },
        ]
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <MyStyles/>
        <RouterProvider router={router} />
    </StrictMode>,
);