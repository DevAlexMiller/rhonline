import { LoginContent, LoginLogo, LoginPage, PageLogo, LogoImg, FormItemsWrapper } from './styles';
import Button from '../../components/Button';
import InputComponent from '../../components/Inputs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    async function onVerificationClick(e) {
        e.preventDefault(); 
        setErrorMessage('');
        
        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
            console.log(API_BASE_URL);
            const response = await axios.post(`${API_BASE_URL}/login`, {
                cpf: cpf,
                senha: senha
            });

            const { success, message, data } = response.data;
            
            if (success) {
                console.log("Dados recebidos:", data);
                const { token, isAdmin, codigoFuncionario, cpf, cpfAsPassword } = data; 
            
                // Salva dados da sessão
                localStorage.setItem('authToken', token);
                localStorage.setItem('isAdmin', String(isAdmin)); 
                localStorage.setItem('codigoFuncionario', codigoFuncionario);
                localStorage.setItem('cpf', cpf); 
            
                // Flag de senha insegura
                if (cpfAsPassword === true) {
                    localStorage.setItem('CPF_AS_PASSWORD', 'true');
                    alert("⚠️ Sua senha atual é igual ao CPF. Por segurança, é necessário alterá-la antes de continuar.");
                    navigate('/newPassword'); // 🔁 Redireciona diretamente
                    return; // impede seguir para /home
                } else {
                    localStorage.removeItem('CPF_AS_PASSWORD');
                }
            
                console.log("Login realizado com sucesso! Código:", codigoFuncionario);
                navigate('/home');
            } else {
                setErrorMessage(message);
            }
        } catch (error) {
            // Garante que o flag de senha insegura é limpo em caso de falha no login
            localStorage.removeItem('CPF_AS_PASSWORD'); 
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Erro ao conectar com o servidor.");
            }
            console.error(error);
        }
    }

    return (
        <LoginPage>
            <LoginContent>
                <PageLogo>
                    <LogoImg src="/rhonlineBlack.svg" />
                </PageLogo>
                
                <form onSubmit={onVerificationClick}>
                    <FormItemsWrapper>
                        <InputComponent
                            placeholder="CPF"
                            iconPath="/userBlack.svg"
                            value={cpf}
                            onChange={e => setCpf(e.target.value)}
                        />
                        <InputComponent
                            placeholder="SENHA"
                            iconPath="/keyBlack.svg"
                            type="password"
                            isPassword={true}
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                        />
                        <Button type="submit">Login</Button>
                    </FormItemsWrapper>
                </form>

                {errorMessage && (
                    <p style={{ color: 'red', marginTop: '10px' }}>
                        {errorMessage}
                    </p>
                )}
            </LoginContent>
            <LoginLogo>
                <img src="/superbom.svg" />
            </LoginLogo>
        </LoginPage>
    );
}

export default Login;