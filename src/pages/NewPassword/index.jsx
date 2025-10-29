import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/SideBar";
import { MyPassword, NewPassword } from "./styles";
import InputComponent from "../../components/Inputs";
import Button from "../../components/Button";
import axios from 'axios';

function Password() {
    // === ESTADOS PARA DADOS E AUTENTICAÇÃO ===
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [statusMessage, setStatusMessage] = useState(''); 
    const [statusColor, setStatusColor] = useState('black');
    
    const [userName, setUserName] = useState('Carregando...');
    const [userRole, setUserRole] = useState('Carregando...');
    
    // Dados de autenticação do localStorage
    const cpf = localStorage.getItem('cpf');
    const employeeCode = localStorage.getItem('codigoFuncionario');
    const token = localStorage.getItem('authToken');
    const navigate = useNavigate(); // Já importado

    // Função de navegação
    const navigateToHome = () => {
        navigate('/home');
    };

    // === LÓGICA DE BUSCA DO PERFIL (NOME E CARGO) ===
    useEffect(() => {
        // ... (Lógica de fetchProfileDetails omitida por brevidade, mas deve estar correta)
        async function fetchProfileDetails() {
            if (!token || !employeeCode) {
                navigate('/');
                return;
            }

            try {
                const API_URL = 'http://10.92.11.8:3000/api/payroll/profile-details';
                
                const response = await axios.post(
                    API_URL,
                    { employeeCode: employeeCode },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                const { nome, cargo } = response.data;
                setUserName(nome || 'Não Encontrado');
                setUserRole(cargo || 'Não Encontrado');

            } catch (error) {
                console.error('Erro ao buscar detalhes do perfil:', error);
                setUserName('Erro ao carregar');
                setUserRole('Erro ao carregar');
                if (error.response?.status === 401) {
                    navigate('/');
                }
            }
        }
        
        fetchProfileDetails();
    }, [token, employeeCode, navigate]);
    
    // === LÓGICA DE TROCA DE SENHA ===
    async function handleChangePassword(e) {
    e.preventDefault();
    setStatusMessage('');
    if (newPassword.length < 6) {
        setStatusColor('red');
        setStatusMessage('A nova senha deve ter no mínimo 6 caracteres.');
        return;
    }
    if (currentPassword === newPassword) {
        setStatusColor('red');
        setStatusMessage('A nova senha não pode ser igual à senha atual.');
        return;
    }
    if (!token || !cpf) {
        setStatusColor('red');
        setStatusMessage('Sessão inválida. Faça login novamente.');
        setTimeout(() => navigate('/'), 1500);
        return;
    }
    try {
        const API_URL = 'http://10.92.11.8:3000/api/change-password';
        const response = await axios.post(
            API_URL,
            {
                cpf: cpf,
                currentPassword: currentPassword,
                newPassword: newPassword
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        // Sucesso
        setStatusColor('green');
        setStatusMessage(response.data.message || 'Senha alterada com sucesso! Você será redirecionado em 3s.');
        setTimeout(() => {
            localStorage.clear();
            navigate('/');
        }, 3000);
    } catch (error) {
        setStatusColor('red');
        setStatusMessage(error.response?.data?.message || 'Erro ao alterar a senha.');
        console.error(error);
    }
    }


    // === RENDERIZAÇÃO ===
    return (
        <MyPassword>
          <Sidebar />

          <NewPassword>
            {/* 🛑 CORREÇÃO: Adicionando onClick e estilo pointer */}
            <img 
                src="/rhonlineBlack.svg" 
                alt="RH Online" 
                className="rhLogo" 
                onClick={navigateToHome}
                style={{cursor: 'pointer'}}
            />

            <div className="user-info">
              <img src="/userBlack.svg" alt="Ícone usuário" className="userLogo" />
              <div className="labels">
                <p><b>Nome:</b> <span className="profile-value">{userName}</span></p>
                <hr />
                <p><b>Cargo:</b> <span className="profile-value">{userRole}</span></p>
                <hr />
              </div>
            </div>

            <form className="input" onSubmit={handleChangePassword}>
              <div className="input-group">
                <label htmlFor="currentPassword">Senha atual</label>
                <div className="input-field">
                  <InputComponent
                    id="currentPassword"
                    placeholder=""
                    iconPath="/keyBlack.svg"
                    type="password"
                    isPassword={true}
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="newPassword">Nova senha</label>
                <div className="input-field">
                  <InputComponent
                    id="newPassword"
                    placeholder=""
                    iconPath="/keyBlack.svg"
                    type="password"
                    isPassword={true}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
                <div className="saveButton">
                    <Button type="submit">Salvar</Button>
                </div>
              
              
              {statusMessage && (
                  <p style={{ color: statusColor, marginTop: '15px', fontWeight: 'bold' }}>
                      {statusMessage}
                  </p>
              )}
            </form>
          </NewPassword>
        </MyPassword>
    );
}

export default Password;