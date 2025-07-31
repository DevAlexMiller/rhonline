import {LoginContent, LoginLogo, LoginPage, PageLogo, LogoImg} from './styles' 
import Button from '../../components/Button';
import InputComponent from '../../components/Inputs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [cpf, setCpf] = useState('');
    const navigate = useNavigate();
    
    function onVerificationClick() {
        console.log("CPF digitado:", cpf);
        const query = new URLSearchParams();
        query.set("description", cpf)
        navigate(`/home?${query.toString()}`);
    }

    return (
        <LoginPage>
            <LoginContent>
                <PageLogo>
                    <LogoImg src="/rhonlineBlack.svg" />
                </PageLogo>
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
                />
                <Button onClick={onVerificationClick}>Login</Button>
            </LoginContent>
            <LoginLogo>
                <img src="/superbom.svg" />
            </LoginLogo>
        </LoginPage>
    );
}

export default Login;