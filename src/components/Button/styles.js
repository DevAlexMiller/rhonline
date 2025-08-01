import styled from "styled-components";
import breakpoints from "../../styles/breakpoints";

export const MyButton = styled.button`
  width: 20%;
  min-height: 30px;
  border-radius: 5vw;
  background-color: #E40404;
  padding: 1vh 1.5vw;
  border: none;
  outline: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    color: white;
    background-color: #960202;
    border: 0.15vw solid #960202;
  }

  @media ${breakpoints.bg} {
    width: 20%;
    
  }
`;
