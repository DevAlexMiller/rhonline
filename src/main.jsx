import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Login from './pages/Login';
import Home from './pages/Home';
import Password from './pages/NewPassword'; 
import ResetPassword from './pages/ResetPassword';
import NewUser from './pages/NewUser';
import Perfil from './pages/Perfil';
import MyStyles from './styles/globalStyles';
import {createBrowserRouter, RouterProvider, Navigate, useLocation, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

// 🛑 NOVO COMPONENTE: Encapsula a lógica de segurança e autenticação
const SecurityWrapper = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = localStorage.getItem('authToken');
    const cpfAsPassword = localStorage.getItem('CPF_AS_PASSWORD') === 'true'; 

    useEffect(() => {
        const currentPath = location.pathname;
        const authRequired = currentPath !== '/'; 

        // 1. Checagem de Autenticação
        if (authRequired && !isAuthenticated) {
            return navigate('/');
        }
        
        // 2. 🛑 Checagem de Senha Insegura (Forçar Troca)
        // Redireciona para /newPassword se a senha for o CPF E não estiver já lá.
        const isPasswordChangePage = currentPath === '/newPassword';

        if (isAuthenticated && cpfAsPassword && !isPasswordChangePage) {
            return navigate('/newPassword', { replace: true });
        }
    }, [isAuthenticated, cpfAsPassword, location.pathname, navigate]);

    // Bloqueia a renderização se não estiver autenticado.
    if (!isAuthenticated) {
        return null;
    }
    
    // Se a senha for o CPF e a rota NÃO for a de troca, renderiza nada 
    // (o useEffect acima já forçou o redirecionamento).
    const isPasswordChangePage = location.pathname === '/newPassword';
    if (cpfAsPassword && !isPasswordChangePage) {
        return null; 
    }
    
    // Se tudo estiver OK ou se for a tela de troca de senha, renderiza o conteúdo
    return children;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/home",
        // 🛑 Usa o SecurityWrapper
        element: <SecurityWrapper><Home /></SecurityWrapper>,
    },
    {
        path: "/newPassword",
        // 🛑 Usa o SecurityWrapper
        element: <SecurityWrapper><Password /></SecurityWrapper>,
    },
    {
        path: "/resetPassword",
        // 🛑 Usa o SecurityWrapper
        element: <SecurityWrapper><ResetPassword /></SecurityWrapper>
    },
    {
        path: "/newUser",
        // 🛑 Usa o SecurityWrapper
        element: <SecurityWrapper><NewUser /></SecurityWrapper>
    },
    {
        path: "/perfil",
        // 🛑 Usa o SecurityWrapper
        element: <SecurityWrapper><Perfil /></SecurityWrapper>
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <MyStyles/>
        <RouterProvider router={router} />
    </StrictMode>,
);