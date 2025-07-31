import styled from 'styled-components';

export const MySidebar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: ${props => (props.$open ? '200px' : '60px')};
  height: 100vh;
  background-color: #e40404;
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.$open ? 'flex-start' : 'center')};
  padding-top: 6vh;
  gap: 2vh;
  transition: width 0.6s;
  svg {
    color: white;
    width: 5vw;
    height: 5vh;
    cursor: pointer;
  }
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 10px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 40px;
`;

export const Label = styled.span`
  color: white;
  white-space: nowrap;
  font-size: 16px;
`;