import styled from 'styled-components';
import breakpoints from '../../styles/breakpoints';

export const MyUser = styled.div`
  display: flex;
  height: 100vh;
  background-color: #fff;
  overflow: hidden;
`;

export const Newuser = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow-y: auto;
  
  p{
    color: #000;
    font-size: 10px;
  };

  .user-info {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    width: 100%;
    max-width: 30vw;
    margin-bottom: 2rem;

    img {
      width: 6vw;
      height: 13vh;
    }

    .labels {
      flex: 1;

      p {
        font-size: 1rem;
        margin: 0;
      }
    }
  }

  .saveButton {
    align-self: center;
    button {
      width: 10vw;
    }
  }

  .rhLogo {
    width: 25vw;
    height: 25vh;
    object-fit: contain;
    display: block;
    margin: -10rem auto 2rem auto;
    align-items: center;
  }

  .input {
    width: 100%;
    max-width: 40vw;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .input-group {
      display: flex;
      flex-direction: column;
      width: 100%;

      label {
        font-size: 1rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
        text-align: left;
        margin-left: 30vh;
      }

      .input-field {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    button {
      align-self: center;
      width: fit-content;
    }
  }

  @media ${breakpoints.sm}{
    .saveButton {
        button {
          width: 30vw;
        }
      }
    
    .input {
      width: 100%;
      max-width: 80vw;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .label {
      width: 40%;
    }
  }
`;

export const AdmInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; /* Alinha verticalmente */
  justify-content: center;
  gap: 12px; /* Espaçamento horizontal entre texto e checkbox */

  p {
    font-size: 1.1rem;
    margin: 0;
  }

  /* Mantendo a estilização anterior da caixa */
  input[type="checkbox"] {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid red; 
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    background-color: white;
  }

  input[type="checkbox"]:checked {
    background-color: red;
    border-color: red;
  }

  input[type="checkbox"]:checked::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 6px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;
