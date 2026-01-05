import React, { useState, useEffect, useMemo } from 'react';
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
  FilterControls 
} from './styles';
import { BiSearch } from 'react-icons/bi';
import { jwtDecode } from 'jwt-decode'; // 🛑 Importação necessária

const Grid = ({ columns, data, showAdminControls }) => {
  const [quantidade, setQuantidade] = useState(5);
  const [busca, setBusca] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // 🛑 EXTRAÇÃO SEGURA DO TOKEN
  const authData = useMemo(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return {
        token,
        isAdmin: decoded.isAdmin // ✅ Status de admin vem do Token
      };
    } catch (error) {
      console.error("Erro ao decodificar token no Grid:", error);
      return null;
    }
  }, []);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_URL_CREATE = `${API_BASE_URL}/create-payroll-month`;
  const API_URL_DELETE = `${API_BASE_URL}/delete-payroll-month`;

  // --- FUNÇÕES DE ADMINISTRAÇÃO ---
  async function handleOpenMonth() {
    setStatusMessage('Abrindo mês...');
    setIsSuccess(false);
    
    if (!authData?.token) { 
        setStatusMessage('Erro: Sessão não autenticada.'); 
        return; 
    }
    
    if (!window.confirm("ATENÇÃO: Você tem certeza que deseja abrir o próximo período de folha?")) {
      setStatusMessage('Abertura de mês cancelada.');
      return;
    }
      
    try {
      const response = await axios.post(
        API_URL_CREATE, 
        {}, 
        { headers: { Authorization: `Bearer ${authData.token}` } }
      );

      if (response.data.success) {
        const { ano, mes } = response.data.data;
        setIsSuccess(true);
        setStatusMessage(`Período ${mes}/${ano} aberto com sucesso!`); 
        setTimeout(() => window.location.reload(), 600);
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
    
    if (!authData?.token) { 
        setStatusMessage('Erro: Sessão não autenticada.'); 
        return; 
    }
    
    if (!window.confirm("ATENÇÃO: Você tem certeza que deseja excluir o último mês cadastrado?")) {
      setStatusMessage('Exclusão cancelada.');
      return;
    }

    try {
      const response = await axios.delete(
        API_URL_DELETE, 
        { headers: { Authorization: `Bearer ${authData.token}` } }
      );

      if (response.data.success) {
        const { ano, mes } = response.data.data;
        setIsSuccess(true);
        setStatusMessage(`Período ${mes}/${ano} excluído com sucesso!`);
        setTimeout(() => window.location.reload(), 600);
      } else {
        setStatusMessage(`Erro: ${response.data.message}`);
      }
    } catch (error) {
      setIsSuccess(false);
      setStatusMessage(error.response?.data?.message || 'Falha ao conectar com o servidor.');
    }
  }

  // --- FILTRAGEM DE DADOS ---
  const linhas = Array.isArray(data) ? data : Object.values(data);
  const linhasFiltradas = linhas.filter((linha) => { 
    const termoBusca = busca.toLowerCase();
    return Object.values(linha)
      .some(value => value?.toString().toLowerCase().includes(termoBusca));
  });
  const linhasExibidas = linhasFiltradas.slice(0, quantidade);
    
  // 🛑 Verificação de permissão baseada no Token + Propriedade do Componente
  const shouldShowButtons = authData?.isAdmin && showAdminControls;

  return (
    <GridContainer>
      {/* Filtros */}
      <FilterControls> 
        
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

        {/* 2. CENTRO: Botões de Admin (Com visibilidade controlada pelo JWT) */}
        <div style={{ 
            marginLeft: 'auto', 
            marginRight: 'auto',
            visibility: shouldShowButtons ? 'visible' : 'hidden', 
            minWidth: '250px' 
        }}>
          <ButtonWrapper>
            <Button onClick={handleOpenMonth}>Abrir Mês</Button>
            <Button onClick={handleDeleteMonth}>Excluir Mês</Button>
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

      {/* Status */}
      {statusMessage && (
          <p style={{ color: isSuccess ? 'green' : 'red', fontWeight: 'bold', margin: '10px 0', textAlign: 'center' }}>
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