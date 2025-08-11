import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  RoundedTable,
  GridContainer,
  QuantidadeWrapper,
  QuantidadeSelect,
  SearchWrapper,
  SearchInput
} from './styles';
import { BiSearch } from 'react-icons/bi';

const Grid = ({ columns, data }) => {
  const [quantidade, setQuantidade] = useState(5);
  const [busca, setBusca] = useState('');

  const linhas = Array.isArray(data) ? data : Object.values(data);

  const linhasFiltradas = linhas.filter((linha) => {
    const termoBusca = busca.toLowerCase();
    return Object.values(linha)
      .some(value => value?.toString().toLowerCase().includes(termoBusca));
  });

  const linhasExibidas = linhasFiltradas.slice(0, quantidade);

  return (
    <GridContainer>
      {/* Filtros */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2vh' }}>
        <QuantidadeWrapper>
          <label htmlFor="quantidadeSelect"><strong>Quantidade:</strong></label>
          <QuantidadeSelect
            id="quantidadeSelect"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </QuantidadeSelect>
        </QuantidadeWrapper>

        <div style={{ marginLeft: 'auto' }}>
          <SearchWrapper>
            <SearchInput
              type="text"
              placeholder="Pesquisar"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <BiSearch size="1.2em" color="#333" />
          </SearchWrapper>
        </div>
      </div>

      {/* Tabela */}
      <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
        <RoundedTable
          striped
          bordered
          hover
          responsive
          style={{ textAlign: 'center', verticalAlign: 'middle', marginBottom: 0 }}
        >
          <thead className="table-light">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} style={{ textAlign: 'center' }}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {linhasExibidas.map((linha, index) => (
              <tr key={index}>
                {columns.map((col, idx) => (
                  <td key={idx} style={{ verticalAlign: 'middle' }}>
                    {linha[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </RoundedTable>
      </div>
    </GridContainer>
  );
};

export default Grid;
