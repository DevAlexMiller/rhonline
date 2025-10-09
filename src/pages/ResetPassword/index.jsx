import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/SideBar';
import Grid from '../../components/Grid';
import { MdLockReset } from "react-icons/md";
import { ResetPage, MyGrid } from './styles'; 

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState('');
    
    const navigate = useNavigate();

    // Endpoints conforme seu setup:
    const API_URL_USERS = 'http://localhost:3000/api/usuarios'; // Rota para listar usuários (GET)
    const API_URL_RESET = 'http://10.92.11.254:3000/api/reset-password'; // Rota para resetar (POST)

    const token = localStorage.getItem('authToken');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    // ---------------------------------------------
    // FUNÇÃO DE AÇÃO: REDEFINIR SENHA (POST)
    // ---------------------------------------------
    const handleRedefinir = async (cpf) => {
        setStatusMessage('');
        
        if (!isAdmin) {
            setStatusMessage('Ação negada. Você não tem permissão de administrador.');
            return;
        }
        
        try {
            const response = await axios.post(
                API_URL_RESET,
                { cpf: cpf }, // Envia apenas o CPF do usuário a ser resetado
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {
                const newPass = response.data.data.newPassword;
                setStatusMessage(`Senha redefinida para o cpf`);
            } else {
                setStatusMessage(`❌ Erro: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Erro ao resetar senha:', error);
            if (error.response?.status === 403) {
                 setStatusMessage('❌ Você não tem permissão para esta ação.');
            } else if (error.response?.status === 404) {
                 setStatusMessage('❌ Usuário não encontrado no sistema.');
            } else {
                 setStatusMessage('❌ Erro de conexão ao tentar resetar senha.');
            }
        }
    };

    // ---------------------------------------------
    // FUNÇÃO DE BUSCA: CARREGAR LISTA DE USUÁRIOS (GET)
    // ---------------------------------------------
    useEffect(() => {
        async function fetchUsers() {
            if (!token) {
                navigate('/');
                return;
            }
            
            // Se o usuário não for admin, ele não deve nem tentar carregar a página
            if (!isAdmin) {
                setUsers([]);
                setLoading(false);
                setStatusMessage('Acesso restrito a administradores.');
                return;
            }

            try {
                // Requisição GET para buscar todos os usuários
                const response = await axios.get(API_URL_USERS, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // O backend agora retorna o array de objetos com 'nome' e 'codigo'
                setUsers(response.data); 
            } catch (error) {
                console.error('Erro ao buscar lista de usuários:', error);
                setStatusMessage('Falha ao carregar lista de usuários. Verifique o servidor.');
            } finally {
                setLoading(false);
            }
        }
        
        fetchUsers();
    }, [token, isAdmin, navigate]);


    // ---------------------------------------------
    // MAPEAMENTO PARA O GRID (CORRIGIDO)
    // ---------------------------------------------
    const dadosComAcao = users.map((u) => ({
        // Usa as novas chaves retornadas pelo backend: u.codigo, u.nome
        'Código': u.codigo || u.cpf, // Prioriza o código de funcionário, senão usa CPF
        'Nome': u.nome, 
        'CPF': u.cpf, 
        'Redefinir': (
            <button
                // Passa o CPF do usuário para a função de reset
                onClick={() => handleRedefinir(u.cpf)} 
                style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 4
                }}
                title={`Redefinir senha de ${u.nome}`}
                aria-label={`Redefinir senha de ${u.nome}`}
            >
                <MdLockReset size="1.2rem" />
            </button>
        )
    }));

    const columns = [
        { key: 'Código', label: 'Código' },
        { key: 'Nome', label: 'Nome' },
        { key: 'CPF', label: 'CPF' },
        { key: 'Redefinir', label: 'Redefinir' }
    ];
    
    if (loading) {
        return (
            <ResetPage><Sidebar /><MyGrid><h2>Carregando usuários...</h2></MyGrid></ResetPage>
        );
    }

    return (
        <ResetPage>
            <Sidebar />
            <MyGrid>
                <img src="/rhonlineBlack.svg" alt="Logo" />
                {statusMessage && <p style={{ color: isAdmin ? 'blue' : 'red', fontWeight: 'bold' }}>{statusMessage}</p>}
                <Grid columns={columns} data={dadosComAcao} />
            </MyGrid>
        </ResetPage>
    );
}

export default ResetPassword;