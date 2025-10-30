import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/SideBar";
import { MyPassword, NewPassword } from "./styles";
import axios from 'axios';

function Perfil() {
    const [userName, setUserName] = useState('Carregando...');
    const [userRole, setUserRole] = useState('Carregando...');
    const [userDep, setUserDep] = useState('Carregando...');
    const [userCpf, setUserCpf] = useState('Carregando...');
    const [userDate, setUserDate] = useState('Carregando...');
    const [userCodFunc, setUserCodFunc] = useState('Carregando...');
    
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
                const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
                const API_URL = `${API_BASE_URL}/payroll/profile-details`;
                
                const response = await axios.post(
                    API_URL,
                    { employeeCode: employeeCode },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                
                const { nome, cargo, departamento, cpf, data_nascimento, codigo_funcionario } = response.data;
                
                let dataFormatada = 'Não Encontrado';
                if (data_nascimento) {
                // Extrai apenas a parte da data antes do 'T'
                const [ano, mes, dia] = data_nascimento.split('T')[0].split('-');
                dataFormatada = `${dia}/${mes}/${ano}`;
                }
                                
                setUserName(nome || 'Não Encontrado');
                setUserRole(cargo || 'Não Encontrado');
                setUserDep(departamento || 'Não Encontrado');
                setUserCpf(cpf || 'Não Encontrado');
                setUserDate(dataFormatada || 'Não Encontrado');
                setUserCodFunc(codigo_funcionario || 'Não Encontrado');
                console.log(response.data);

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
                <p><b>CPF:</b> <span className="profile-value">{userCpf}</span></p>
                <hr />
                <p><b>Departamento:</b> <span className="profile-value">{userDep}</span></p>
                <hr />
                <p><b>Cargo:</b> <span className="profile-value">{userRole}</span></p>
                <hr />
                <p><b>Data de nascimento:</b> <span className="profile-value">{userDate}</span></p>
                <hr />
                <p><b>Código de funcionário:</b> <span className="profile-value">{userCodFunc}</span></p>
                <hr />
              </div>
            </div>
          </NewPassword>
        </MyPassword>
    );
}

export default Perfil;