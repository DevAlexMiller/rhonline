import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '../../components/Button';
import axios from 'axios';
import {
  RoundedTable,
  GridContainer,
  QuantidadeWrapper,
  QuantidadeSelect,
  SearchWrapper,
  SearchInput,
  ButtonWrapper,
  FilterControls // 🛑 Importado o FilterControls
} from './styles';
import { BiSearch } from 'react-icons/bi';

const Grid = ({ columns, data, showAdminControls}) => {
  const [quantidade, setQuantidade] = useState(5);
  const [busca, setBusca] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  
  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  const token = localStorage.getItem('authToken');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  const API_URL_CREATE = `${API_BASE_URL}/create-payroll-month`;
  const API_URL_DELETE = `${API_BASE_URL}/delete-payroll-month`;

  // [handleOpenMonth e handleDeleteMonth Functions]
  async function handleOpenMonth() {
    setStatusMessage('Abrindo mês...');
    setIsSuccess(false);
    if (!token) { setStatusMessage('Erro: Sessão não autenticada.'); return; }
    if (!window.confirm("ATENÇÃO: Você tem certeza que deseja abrir o próximo período de folha?")) {
              setStatusMessage('Abertura de mês cancelada.');
              return;
          }
      
          try {
              const response = await axios.post(API_URL_CREATE, {}, { headers: { Authorization: `Bearer ${token}` } });
              if (response.data.success) {
                  const { ano, mes } = response.data.data;
                  setIsSuccess(true);
                  setStatusMessage(`Período ${mes}/${ano} aberto com sucesso!`); 
              setTimeout(() => {
                window.location.reload();
              }, 600);
              } else {
                  setStatusMessage(`Erro: ${response.data.message}`);
              }
          } catch (error) {
              setIsSuccess(false);
              setStatusMessage(error.response?.data?.message || 'Falha ao conectar com o servidor.');
          }
  }

  async function handleDeleteMonth() {
    setStatusMessage('Excluindo último mês...');
    setIsSuccess(false);
    if (!token) { setStatusMessage('Erro: Sessão não autenticada.'); return; }
    if (!window.confirm("ATENÇÃO: Você tem certeza que deseja excluir o último mês cadastrado?")) {
        setStatusMessage('Exclusão cancelada.');
        return;
    }
    try {
        const response = await axios.delete(API_URL_DELETE, { headers: { Authorization: `Bearer ${token}` } });
        if (response.data.success) {
            const { ano, mes } = response.data.data;
            setIsSuccess(true);
            setStatusMessage(`Período ${mes}/${ano} excluído com sucesso!`);
            setTimeout(() => {
              window.location.reload();
            }, 600);
        } else {
            setStatusMessage(`Erro: ${response.data.message}`);
        }
    } catch (error) {
        setIsSuccess(false);
        setStatusMessage(error.response?.data?.message || 'Falha ao conectar com o servidor.');
    }
  }


  const linhas = Array.isArray(data) ? data : Object.values(data);
  const linhasFiltradas = linhas.filter((linha) => { 
    const termoBusca = busca.toLowerCase();
    return Object.values(linha)
      .some(value => value?.toString().toLowerCase().includes(termoBusca));
  });
  const linhasExibidas = linhasFiltradas.slice(0, quantidade);
    
    const shouldShowButtons = isAdmin && showAdminControls;

  return (
    <GridContainer>
      {/* Filtros */}
      <FilterControls> {/* 🛑 Usando FilterControls do styles.js */}
        
        {/* 1. Esquerda: Quantidade */}
        <QuantidadeWrapper>
          <label htmlFor="quantidadeSelect">Quantidade:</label>
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
            <option value={linhasFiltradas.length}>Todos</option>
          </QuantidadeSelect>
        </QuantidadeWrapper>

        {/* 🛑 2. CENTRO: Botões de Admin (Com visibilidade para manter o espaço) */}
        <div style={{ 
            marginLeft: 'auto', 
            marginRight: 'auto',
            visibility: shouldShowButtons ? 'visible' : 'hidden', // Mantém o espaço
            minWidth: '250px' 
        }}>
          <ButtonWrapper>
            <Button onClick={handleOpenMonth}> 
              Abrir Mês
            </Button>
            <Button onClick={handleDeleteMonth}> 
              Excluir Mês
            </Button>
          </ButtonWrapper>
        </div>

        {/* 3. Direita: Campo de Pesquisa */}
        <div>
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
      </FilterControls>

      {/* Exibe a mensagem de status */}
      {statusMessage && (
          <p style={{ color: isSuccess ? 'green' : 'red', fontWeight: 'bold', margin: '10px 0' }}>
              {statusMessage}
          </p>
      )}

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