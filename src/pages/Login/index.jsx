import { LoginContent, LoginLogo, LoginPage, PageLogo, LogoImg, FormItemsWrapper } from './styles'; // Importe FormItemsWrapper
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
            const response = await axios.post('http://10.92.11.254:3000/api/login', {
                cpf: cpf,
                senha: senha
            });

            const { success, message, data } = response.data;
            
            if (success) {
                const { token, isAdmin } = data;
                
                localStorage.setItem('authToken', token);
                localStorage.setItem('isAdmin', isAdmin);

                console.log("Login realizado com sucesso! Token:", token);
                
                const query = new URLSearchParams();
                query.set("description", cpf);
                navigate(`/home?${query.toString()}`);
            } else {
                setErrorMessage(message);
            }
        } catch (error) {
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
                    <FormItemsWrapper> {/* Envolva os itens aqui */}
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