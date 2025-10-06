import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Defina a duração do timeout: 10 minutos * 60 segundos * 1000 milissegundos
const TIMEOUT_DURATION = 10 * 60 * 1000; 

const SessionTimeoutWrapper = ({ children }) => {
    const navigate = useNavigate();
    const timerRef = useRef(null); // Usamos useRef para manter a referência do timer

    // Função de Logout: Limpa a sessão e redireciona
    const logout = () => {
        // O mesmo timeout usado na tela de Password: limpa tudo
        localStorage.clear(); 
        navigate('/'); // Redireciona para a tela de Login
        
        // Opcional: Notificar o usuário
        alert("Sua sessão expirou por inatividade. Faça login novamente.");
    };

    // Inicia (ou reinicia) o timer
    const startTimer = () => {
        // Limpa qualquer timer existente para evitar múltiplos timers rodando
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        
        // Define o novo timer
        timerRef.current = setTimeout(logout, TIMEOUT_DURATION);
    };

    // Reseta o timer a cada interação
    const resetTimer = () => {
        // Só faz sentido resetar se o usuário estiver logado
        if (localStorage.getItem('authToken')) {
            startTimer();
        }
    };

    useEffect(() => {
        // Eventos que indicam atividade do usuário
        const events = ['mousemove', 'keypress', 'click', 'scroll'];

        // Adiciona os event listeners
        events.forEach(event => {
            window.addEventListener(event, resetTimer);
        });

        // Inicia o timer na primeira vez que o componente é montado
        startTimer();

        // Função de Limpeza (Cleanup) - Essencial no React
        return () => {
            // Limpa o timer e remove os listeners quando o componente é desmontado
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            events.forEach(event => {
                window.removeEventListener(event, resetTimer);
            });
        };
    }, []); // Array de dependências vazio: o effect roda apenas no mount e unmount

    // Se a sessão já estiver expirada ou se tentar acessar a URL diretamente sem token,
    // o usuário será redirecionado imediatamente (Funciona como um AuthGuard)
    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            navigate('/');
        }
    }, [navigate]);


    return children; // Renderiza o componente filho (Home, Password, etc.)
};

export default SessionTimeoutWrapper;