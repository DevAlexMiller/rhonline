import styled from 'styled-components';
import { Table } from 'react-bootstrap';

export const GridContainer = styled.div`
  padding: 2vh;
`;

export const QuantidadeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1vw;
`;

export const QuantidadeSelect = styled.select`
  padding: 0.5vh 1vw;
  border-radius: 2vh;
  border: 1px solid #ccc;
  height: 4.5vh;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.2;
  appearance: none;
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 2vh;
  padding: 0 1vw;
  height: 4.5vh;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 0 0.5vw;
  background: transparent;
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
