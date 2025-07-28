import {LoginContent, LoginLogo, LoginPage, PageLogo, LogoImg} from './styles' 
import Button from '../../components/Button';
import InputComponent from '../../components/Inputs';

function Login(){

    return (
        <LoginPage>
            <LoginContent>
                <PageLogo>
                    <LogoImg src="/rhonlineBlack.svg" />
                </PageLogo>
                <InputComponent placeholder = "CPF" iconPath='/userBlack.svg' />
                <InputComponent placeholder = "SENHA" iconPath='/keyBlack.svg' type = 'password' isPassword={true} />
                <Button>Login</Button>
            </LoginContent>
            <LoginLogo>
                <img src="/superbom.svg" />
            </LoginLogo>
        </LoginPage>
    )
}

export default Login;