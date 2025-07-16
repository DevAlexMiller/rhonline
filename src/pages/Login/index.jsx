import {LoginContent, LoginLogo, LoginPage, PageLogo} from './styles' 
import Button from '../../components/Button';
import InputComponent from '../../components/Inputs';

function Login(){

    return (
        <LoginPage>
            <LoginContent>
                <PageLogo>
                    <img src="/rhonlineBlack.svg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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