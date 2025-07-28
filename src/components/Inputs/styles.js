import styled from "styled-components";
import breakpoints from "../../styles/breakpoints";

export const MyInput = styled.input`
  width: 100%;
  height: 100%;
  border: 0.15vw solid red;
  border-radius: 6vw;
  background-color: white;
  padding: 1vh 2.5vw 1vh 3.5vw;
  outline: none;
  font-size: 1.5vw ;

  background: ${props =>
    props.iconPath ? `url(${props.iconPath}) no-repeat 0.9vw center` : 'none'};
  background-size: 2vw 2vw;
  padding-right: 4vw;

  @media ${breakpoints.bg}{
    background: ${props =>
      props.iconPath ? `url(${props.iconPath}) no-repeat 0.9vw center` : 'none'};
    background-size: 3.5vw 3.5vw;
    padding: 1vh 2.5vw 1vh 6.5vw;
    font-size: 3vw;
    }

    @media ${breakpoints.md}{
    background-color: blue;
    background: ${props =>
      props.iconPath ? `url(${props.iconPath}) no-repeat 0.9vw center` : 'none'};
    background-size: 4.5vw 4.5vw;
    padding: 1vh 2.5vw 1vh 6.5vw;
    font-size: 3.5vw;
    }

    @media ${breakpoints.sm}{
    background-color: blue;
    background: ${props =>
      props.iconPath ? `url(${props.iconPath}) no-repeat 0.9vw center` : 'none'};
    background-size: 5.5vw 5.5vw;
    padding: 1vh 2.5vw 1vh 7.5vw;
    font-size: 4vw;
    }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 50%; // mesmo que MyInput
  height: 6vh;
  margin: 1vh 0;
`;


export const IconButton = styled.button`
  position: absolute;
  top: 50%;
  right: 1vw;
  transform: translateY(-50%);
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #960202;
  }
`;
