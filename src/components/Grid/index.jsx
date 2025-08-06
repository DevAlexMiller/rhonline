import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiSolidFilePdf, BiSearch } from 'react-icons/bi';
import contracheques from './contracheques.json';
import {
  RoundedTable,
  GridContainer,
  QuantidadeWrapper,
  QuantidadeSelect,
  SearchWrapper,
  SearchInput
} from './styles';

const Grid = () => {
  const [quantidade, setQuantidade] = useState(5);
  const [busca, setBusca] = useState('');

  const linhas = Object.values(contracheques);

  const linhasFiltradas = linhas.filter((linha) => {
    const ano = linha["Ano"].toString().toLowerCase();
    const mes = linha["Mês"].toLowerCase();
    const termoBusca = busca.toLowerCase();
    return ano.includes(termoBusca) || mes.includes(termoBusca);
  });

  const linhasExibidas = linhasFiltradas.slice(0, quantidade);

  return (
    <GridContainer>
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
              <th style={{ textAlign: 'center' }}>Ano</th>
              <th style={{ textAlign: 'center' }}>Mês</th>
              <th style={{ textAlign: 'center' }}>Contracheque simples</th>
              <th style={{ textAlign: 'center' }}>Contracheque detalhado</th>
            </tr>
          </thead>
          <tbody>
            {linhasExibidas.map((linha, index) => (
              <tr key={index}>
                <td style={{ verticalAlign: 'middle' }}>{linha["Ano"]}</td>
                <td style={{ verticalAlign: 'middle' }}>{linha["Mês"]}</td>
                <td style={{ verticalAlign: 'middle' }}>
                  <BiSolidFilePdf
                    color="#000"
                    size="1.5em"
                    style={{ cursor: 'pointer' }}
                    title="Baixar contracheque simples"
                  />
                </td>
                <td style={{ verticalAlign: 'middle' }}>
                  <BiSolidFilePdf
                    color="#000"
                    size="1.5em"
                    style={{ cursor: 'pointer' }}
                    title="Baixar contracheque detalhado"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </RoundedTable>
      </div>
    </GridContainer>
  );
};

export default Grid;
