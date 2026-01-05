import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/SideBar';
import Grid from '../../components/Grid';
import { MdLockReset } from "react-icons/md";
import { ResetPage, MyGrid } from './styles'; 
import { jwtDecode } from 'jwt-decode'; // 🛑 Importação necessária

function ResetPassword() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/home');
  };

  // 🛑 EXTRAÇÃO SEGURA DO TOKEN
  const authData = useMemo(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return {
        token,
        isAdmin: decoded.isAdmin // Extrai privilégio de administrador do token
      };
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      return null;
    }
  }, []);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_URL_USERS = `${API_BASE_URL}/usuarios`; 
  const API_URL_RESET = `${API_BASE_URL}/reset-password`; 

  // ---------------------------------------------
  // FUNÇÃO DE AÇÃO: REDEFINIR SENHA (POST)
  // ---------------------------------------------
  const handleRedefinir = async (cpf) => {
    setStatusMessage('');
    
    if (!authData?.isAdmin) {
      setStatusMessage('Ação negada. Você não tem permissão de administrador.');
      return;
    }
    
    try {
      const response = await axios.post(
        API_URL_RESET,
        { cpf: cpf },
        {
          headers: {
            Authorization: `Bearer ${authData.token}`
          }
        }
      );

      if (response.data.success) {
        setStatusMessage(`Senha redefinida para o CPF ${cpf}`);
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
      if (!authData?.token) {
        navigate('/');
        return;
      }
      
      if (!authData.isAdmin) {
        setUsers([]);
        setLoading(false);
        setStatusMessage('Acesso restrito a administradores.');
        return;
      }

      try {
        const response = await axios.get(API_URL_USERS, {
          headers: {
            Authorization: `Bearer ${authData.token}`
          }
        });

        setUsers(response.data);
      } catch (error) {
        console.error('Erro ao buscar lista de usuários:', error);
        setStatusMessage('Falha ao carregar lista de usuários. Verifique o servidor.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchUsers();
  }, [authData, navigate]);

  // ---------------------------------------------
  // MAPEAMENTO PARA O GRID
  // ---------------------------------------------
  const dadosComAcao = users.map((u) => ({
    'Código': u.codigo || u.cpf,
    'Nome': u.nome, 
    'CPF': u.cpf, 
    'Redefinir': (
      <button
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
  
  if (!authData) return null;

  return (
    <ResetPage>
      <Sidebar />
      <MyGrid>
        <img 
          src="/rhonlineBlack.svg" 
          alt="Logo" 
          onClick={navigateToHome} 
          style={{ cursor: 'pointer' }} 
        />
        
        {statusMessage && (
          <p style={{ color: authData.isAdmin ? 'blue' : 'red', fontWeight: 'bold' }}>
            {statusMessage}
          </p>
        )}

        <Grid columns={columns} data={dadosComAcao} />
      </MyGrid>

      {loading && (
        <div
          style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)", display: "flex", alignItems: "center",
            justifyContent: "center", zIndex: 9999, color: "#fff", flexDirection: "column", fontSize: "1.3em",
          }}
        >
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-white mb-4"></div>
          Carregando usuários...
        </div>
      )}
    </ResetPage>
  );
}

export default ResetPassword;