import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../../components/SideBar";
import { MyUser, Newuser, AdmInput } from "./styles";
import InputComponent from "../../components/Inputs";
import Button from "../../components/Button";

function NewUser() {
    // === ESTADOS PARA DADOS E STATUS ===
    const [cpf, setCpf] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [statusColor, setStatusColor] = useState('black');

    const navigate = useNavigate();
    
    // ✅ Mantemos apenas o token para autorização da requisição
    const token = localStorage.getItem('authToken');

    const navigateToHome = () => {
        navigate('/home');
    };

    // === LÓGICA DE CRIAÇÃO DE USUÁRIO ===
    async function handleCreateUser(e) {
        e.preventDefault();
        setStatusMessage('');

        if (!token) {
            setStatusColor('red');
            setStatusMessage('Sessão expirada. Faça login novamente.');
            setTimeout(() => navigate('/'), 1500);
            return;
        }

        // Validação básica do CPF
        if (!cpf || cpf.replace(/\D/g, '').length < 11) {
            setStatusColor('red');
            setStatusMessage('CPF inválido ou ausente.');
            return;
        }

        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
            const API_URL = `${API_BASE_URL}/create`;

            await axios.post(
                API_URL,
                {
                    cpf: cpf,
                    isAdmin: isAdmin 
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Sucesso
            setStatusColor('green');
            setStatusMessage(`Usuário criado com sucesso. A senha inicial é o próprio CPF.`);

            // Limpar formulário
            setCpf('');
            setIsAdmin(false);

        } catch (error) {
            setStatusColor('red');
            if (error.response?.status === 409) {
                setStatusMessage('Erro: CPF já cadastrado.');
            } else if (error.response?.status === 401 || error.response?.status === 403) {
                setStatusMessage('Acesso negado. Apenas administradores podem criar usuários.');
            } else if (error.response) {
                setStatusMessage(error.response.data.message || 'Falha ao criar usuário.');
            } else {
                setStatusMessage('Erro de conexão com o servidor.');
            }
            console.error(error);
        }
    }

    return (
        <MyUser>
          <Sidebar />
          <Newuser>
            <img 
                src="/rhonlineBlack.svg" 
                alt="RH Online" 
                className="rhLogo" 
                onClick={navigateToHome} 
                style={{cursor: 'pointer'}}
            />
            <h3>Adicionar novo usuário</h3>
            <hr />
            {statusMessage && (
                  <p style={{ color: statusColor, marginTop: '15px', fontWeight: 'bold', textAlign: 'center' }}>
                      {statusMessage}
                  </p>
              )}
            <form className="input" onSubmit={handleCreateUser}>
              <div className="input-group">
                  <div className="input-field">
                      <InputComponent
                          id="cpfInput"
                          placeholder="CPF (apenas números)"
                          iconPath="/userBlack.svg"
                          type="text"
                          isPassword={false}
                          value={cpf}
                          onChange={e => setCpf(e.target.value)}
                      />
                  </div>
              </div>
              
              <AdmInput>
                  <p>Administrador</p>
                  <input 
                      type="checkbox"
                      checked={isAdmin}
                      onChange={e => setIsAdmin(e.target.checked)}
                  />
              </AdmInput>
              
              <div className='saveButton'>
                <Button type="submit">Adicionar</Button>
              </div>
            </form>
          </Newuser>
        </MyUser>
    );
}

export default NewUser;