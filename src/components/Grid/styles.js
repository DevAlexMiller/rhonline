import styled from 'styled-components';
import { Table } from 'react-bootstrap';
// import { MyButton } from '../Button/styles'; // Importação que você mencionou

export const GridContainer = styled.div`
  padding: 2vh;
`;

export const FilterControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2vh;
  width: 100%;

  /* Garante alinhamento central mesmo com espaçamentos variáveis */
  > div:nth-child(2) {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  /* Mantém o campo de pesquisa à direita */
  > div:last-child {
    display: flex;
    justify-content: flex-end;
  }
`;

export const QuantidadeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;

  label {
    margin-right: 0.1rem; /* Espaço responsivo entre o texto e o select */
    font-weight: 600;
    font-size: 1rem;
  }

  select {
    margin-left: 0.3rem; /* Ajuste fino, também responsivo */
  }
`;

export const QuantidadeSelect = styled.select`
  text-align: center;
  padding: 0.4rem 1.2rem;
  border-radius: 2rem;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  appearance: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  width: 5.2vw;

  &:focus {
    outline: none;
    border-color: #999;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30vw; 
  gap: 10px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3vh; 
    width: 10vw;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 2rem;
  padding: 0 0.8rem;
  height: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #999;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
  }
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 0.9rem;
  padding: 0 0.4rem;
  background: transparent;
  width: 10rem;
`;

export const RoundedTable = styled(Table)`
  border-collapse: separate !important;
  border-spacing: 0;
  overflow: hidden;
  border: 1px solid #dee2e6;
  border-radius: 1vh;

  thead > tr:first-child > th:first-child {
    border-top-left-radius: 1vh;
  }

  thead > tr:first-child > th:last-child {
    border-top-right-radius: 1vh;
  }

  tbody > tr:last-child > td:first-child {
    border-bottom-left-radius: 1vh;
  }

  tbody > tr:last-child > td:last-child {
    border-bottom-right-radius: 1vh;
  }

  th, td {
    border: 1px solid #dee2e6 !important;
    text-align: center;
    vertical-align: middle;
  }
`;