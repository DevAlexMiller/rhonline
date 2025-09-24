import styled from 'styled-components'
import breakpoints from '../../styles/breakpoints'

export const LoginPage = styled.div `
    background-color: white;
    display: flex;
`

export const LoginContent = styled.div `
    gap: 3vh;
    background-color: white;
    width: 50vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;

    @media ${breakpoints.bg}{
        width: 100vw;
        height: 100vh;
    }
`

export const LoginLogo = styled.div `
    width: 50vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #e40404;
    box-shadow: 1px 1px 30px rgba(0, 0, 0, 0.9);

    @media ${breakpoints.bg}{
        display: none;
    }
`

export const PageLogo = styled.div `
    width: 100vw;
    height: 25vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: transparent;
    position: relativa;
    margin-top: -20vh;
    margin-bottom: 10vh;
`

export const LogoImg = styled.img`
    width: 100%;
    max-width: 200px;
    height: auto;
    object-fit: contain;
    display: block;
    margin: 0 auto;

    @media ${breakpoints.bg}{
        margin-top: 20vh;
    }

    @media ${breakpoints.md}{
        margin-top: 20vh;
    }

    @media ${breakpoints.sm}{
        margin-top: 20vh;
        width: 50%;
        height: 90%;
    }
`;

export const FormItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3vh; /* Ou o valor que você preferir para o espaçamento */
  width: 100%; /* Garante que o wrapper ocupe a largura total */
  align-items: center; /* Centraliza os itens */
`;