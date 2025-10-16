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
        if (!cpf || cpf.length < 11) {
            setStatusColor('red');
            setStatusMessage('CPF inválido ou ausente.');
            return;
        }

        try {
            const API_URL = 'http://10.92.11.8:3000/api/create';

            const response = await axios.post(
                API_URL,
                {
                    cpf: cpf,
                    isAdmin: isAdmin // Envia o booleano diretamente
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Sucesso: O backend retorna a senha inicial (o próprio CPF)
            setStatusColor('green');
            const initialPassword = response.data.data.initialPassword;
            setStatusMessage(`Usuário criado. A senha inicial é o CPF`);

            // Limpar formulário
            setCpf('');
            setIsAdmin(false);

        } catch (error) {
            setStatusColor('red');
            if (error.response?.status === 409) {
                setStatusMessage('Erro: CPF já cadastrado.');
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
            <img src="/rhonlineBlack.svg" alt="RH Online" className="rhLogo" onClick={navigateToHome} style={{cursor: 'pointer'}}/>
            <h3>Adicionar novo usuário</h3>
            <hr />
            {statusMessage && (
                  <p style={{ color: statusColor, marginTop: '15px', fontWeight: 'bold' }}>
                      {statusMessage}
                  </p>
              )}
            {/* 🛑 Formulário Principal */}
            <form className="input" onSubmit={handleCreateUser}>
              <div className="input-group">
                  <label htmlFor="cpfInput"></label>
                  <div className="input-field">
                      <InputComponent
                          id="cpfInput"
                          placeholder="CPF"
                          iconPath="/userBlack.svg"
                          type="text" // Tipo 'text' para input de CPF
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
              
              <Button type="submit">Adicionar</Button>

              
            </form>
          </Newuser>
        </MyUser>
    );
}

export default NewUser;