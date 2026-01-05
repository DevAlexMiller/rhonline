import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const TIMEOUT_DURATION = 10 * 60 * 1000; 

const SessionTimeoutWrapper = ({ children }) => {
    const navigate = useNavigate();
    const timerRef = useRef(null); 

    const logout = () => {
        localStorage.clear(); 
        navigate('/', { replace: true }); 
        alert("Sua sessão expirou por inatividade.");
    };

    const resetTimer = () => {
        if (localStorage.getItem('authToken')) {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(logout, TIMEOUT_DURATION);
        }
    };

    useEffect(() => {
        const events = ['mousemove', 'keypress', 'click', 'scroll'];
        events.forEach(event => window.addEventListener(event, resetTimer));
        resetTimer();

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            events.forEach(event => window.removeEventListener(event, resetTimer));
        };
    }, []); 

    return children; 
};

export default SessionTimeoutWrapper;