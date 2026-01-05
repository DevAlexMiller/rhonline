import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/SideBar";
import { MyPassword, NewPassword } from "./styles";
import InputComponent from "../../components/Inputs";
import Button from "../../components/Button";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // 🛑 Importação necessária

function Password() {
    // === ESTADOS PARA DADOS E AUTENTICAÇÃO ===
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [statusMessage, setStatusMessage] = useState(''); 
    const [statusColor, setStatusColor] = useState('black');
    
    const [userName, setUserName] = useState('Carregando...');
    const [userRole, setUserRole] = useState('Carregando...');
    
    const navigate = useNavigate();

    // 🛑 EXTRAÇÃO SEGURA DO TOKEN
    const authData = useMemo(() => {
        const token = localStorage.getItem('authToken');
        if (!token) return null;
        try {
            const decoded = jwtDecode(token);
            return {
                token,
                cpf: decoded.cpf,
                employeeCode: decoded.codigoFuncionario
            };
        } catch (error) {
            console.error("Erro ao decodificar token:", error);
            return null;
        }
    }, []);

    // Função de navegação
    const navigateToHome = () => {
        navigate('/home');
    };

    // === LÓGICA DE BUSCA DO PERFIL (NOME E CARGO) ===
    useEffect(() => {
        async function fetchProfileDetails() {
            if (!authData?.token || !authData?.employeeCode) {
                navigate('/');
                return;
            }

            try {
                const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
                const API_URL = `${API_BASE_URL}/payroll/profile-details`;
                
                const response = await axios.post(
                    API_URL,
                    { employeeCode: authData.employeeCode }, // 🛑 Usando dado do token
                    { headers: { Authorization: `Bearer ${authData.token}` } }
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
    }, [authData, navigate]);
    
    // === LÓGICA DE TROCA DE SENHA ===
    async function handleChangePassword(e) {
        e.preventDefault();
        setStatusMessage('');

        if (!authData?.cpf || !authData?.token) {
            setStatusColor('red');
            setStatusMessage('Sessão inválida. Faça login novamente.');
            setTimeout(() => navigate('/'), 1500);
            return;
        }

        // === BLOCO DE VALIDAÇÃO ===
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
        if (newPassword === authData.cpf) { // 🛑 Usando CPF do token
            setStatusColor('red');
            setStatusMessage('A nova senha não pode ser igual ao CPF.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setStatusColor('red');
            setStatusMessage('As senhas não coincidem. Verifique e tente novamente.');
            return;
        }

        // Verifica se a troca é obrigatória (senha atual era o CPF)
        const isMandatoryFirstChange = (authData.cpf === currentPassword);

        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
            const API_URL = `${API_BASE_URL}/change-password`;
            
            const response = await axios.post(
                API_URL,
                {
                    cpf: authData.cpf, // 🛑 Usando CPF do token
                    currentPassword: currentPassword,
                    newPassword: newPassword
                },
                { headers: { Authorization: `Bearer ${authData.token}` } }
            );

            setStatusColor('green');
            setStatusMessage(response.data.message || 'Senha alterada com sucesso!');

            if (isMandatoryFirstChange) {
                setTimeout(() => {
                    localStorage.clear(); // Limpa tudo (incluindo o token e flag de segurança)
                    navigate('/');
                }, 3000);
            } else {
                setTimeout(() => {
                    setStatusMessage('');
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                }, 3000);
            }

        } catch (error) {
            setStatusColor('red');
            setStatusMessage(error.response?.data?.message || 'Erro ao alterar a senha.');
            console.error(error);
        }
    }

    return (
        <MyPassword>
            <Sidebar />

            <NewPassword>
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
                                iconPath="/keyBlack.svg"
                                type="password"
                                isPassword={true}
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirmar nova senha</label>
                        <div className="input-field">
                            <InputComponent
                                id="confirmPassword"
                                iconPath="/keyBlack.svg"
                                type="password"
                                isPassword={true}
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="saveButton">
                        <Button type="submit">Salvar</Button>
                    </div>

                    {statusMessage && (
                        <p style={{ textAlign: 'center', color: statusColor, marginTop: '15px', fontWeight: 'bold' }}>
                            {statusMessage}
                        </p>
                    )}
                </form>
            </NewPassword>
        </MyPassword>
    );
}

export default Password;