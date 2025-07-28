import styled from "styled-components";
import breakpoints from "../../styles/breakpoints";

export const MyButton = styled.button`
  width: 100%;
  height: 100%;
  border-radius: 5vw;
  background-color: #E40404;
  padding: 1vh 1.5vw;
  border: none;
  outline: none;
  color: white;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: #960202;
    border: 0.15vw solid #960202;
  }

  @media ${breakpoints.bg}{
    width: 150%;
    height: 120%;
    margin-left: -25%;
  }


`;
