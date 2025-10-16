import styled from "styled-components";
import breakpoints from "../../styles/breakpoints";

export const MyButton = styled.button`
  width: 40%;
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
    border: 0.15vw #960202;
  }

 
`;
