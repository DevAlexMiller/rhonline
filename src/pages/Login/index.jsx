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
            const response = await axios.post(`${API_BASE_URL}/login`, {
                cpf: cpf,
                senha: senha
            });

            const { success, message, data } = response.data;
            
            if (success) {
                const { token, cpfAsPassword } = data; 
            
                // ✅ Gravação dos sinais vitais
                localStorage.setItem('authToken', token);
            
                if (cpfAsPassword === true) {
                    localStorage.setItem('CPF_AS_PASSWORD', 'true');
                    alert("⚠️ Sua senha atual é igual ao CPF. É necessário alterá-la.");
                    navigate('/newPassword', { replace: true }); 
                } else {
                    localStorage.removeItem('CPF_AS_PASSWORD');
                    navigate('/home', { replace: true });
                }
            } else {
                setErrorMessage(message);
            }
        } catch (error) {
            localStorage.removeItem('CPF_AS_PASSWORD'); 
            setErrorMessage(error.response?.data?.message || "Erro ao conectar com o servidor.");
        }
    }

    return (
        <LoginPage>
            <LoginContent>
                <PageLogo><LogoImg src="/rhonlineBlack.svg" /></PageLogo>
                <form onSubmit={onVerificationClick}>
                    <FormItemsWrapper>
                        <InputComponent placeholder="CPF" iconPath="/userBlack.svg" value={cpf} onChange={e => setCpf(e.target.value)} />
                        <InputComponent placeholder="SENHA" iconPath="/keyBlack.svg" type="password" isPassword={true} value={senha} onChange={e => setSenha(e.target.value)} />
                        <Button type="submit">Login</Button>
                    </FormItemsWrapper>
                </form>
                {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
            </LoginContent>
            <LoginLogo><img src="/superbom.svg" alt="Logo" /></LoginLogo>
        </LoginPage>
    );
}

export default Login;