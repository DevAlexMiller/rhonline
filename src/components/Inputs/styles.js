import styled from "styled-components";

export const MyInput = styled.input`
  width: 20vw;
  height: 6vh;
  border: 0.15vw solid red;
  border-radius: 6vw;
  background-color: white;
  padding: 1vh 2.5vw 1vh 3vw;
  outline: none;

  background: ${props =>
    props.iconPath ? `url(${props.iconPath}) no-repeat 0.7vw center` : 'none'};
  background-size: 1.5vw 1.5vw;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const IconButton = styled.button`
  position: absolute;
  right: 1vw;
  top: 50%;
  transform: translateY(-50%);
  width: 2vw;
  height: 2vh;
  background: none;
  border: none;
  padding: 0; /* <<< ESSENCIAL */
  margin: 0;
  margin-right: 25vh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
  transition: color 0.2s ease;
  &:hover {
    color: #960202;
  }
`;

