import { HomePage, MyGrid } from './styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/SideBar';
import Grid from '../../components/Grid';
import { BiSolidFilePdf } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [availablePeriods, setAvailablePeriods] = useState([]);
    const [loading, setLoading] = useState(true);
    

    // Busca o código do funcionário diretamente do localStorage
    const employeeCode = localStorage.getItem('codigoFuncionario'); 

    // Mapeamento de números de mês para nomes em português
    const monthNames = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    /**
     * Função responsável por enviar a requisição ao backend para gerar o PDF
     * e abrir o arquivo binário em uma nova guia.
     */
    async function handlePaycheckView(year, month, type) {
        const token = localStorage.getItem('authToken');
        
        if (!token || !employeeCode) {
            console.error("Dados de sessão ausentes.");
            navigate('/login');
            return;
        }

        try {
            const response = await axios.post(
                'http://10.92.11.254:3000/api/payroll/paycheck', // Rota unificada
                {
                    employeeCode: employeeCode,
                    month: month,
                    year: year,
                    type: type,
                    asPdf: 'true' 
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    responseType: 'blob' // CRUCIAL: Recebe o PDF como dado binário
                }
            );

            // 1. Cria um objeto URL a partir do Blob (arquivo binário)
            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);

            // 2. Abre a URL temporária em uma nova guia
            window.open(fileURL, '_blank');
            
            // 3. Libera o objeto URL após um breve atraso
            // Nota: Isso é importante para liberar memória, mas requer um pequeno delay
            // ou ser feito quando a nova janela for fechada (o que é mais complexo em React)
            setTimeout(() => {
                URL.revokeObjectURL(fileURL);
            }, 10000); 

        } catch (error) {
            console.error(`Erro ao visualizar holerite ${type}:`, error);
            if (error.response?.status === 401) {
                alert("Sessão expirada. Faça login novamente.");
                navigate('/login');
            } else {
                alert(`Falha ao visualizar o holerite ${type}.`);
            }
        }
    }


    /**
     * Função para buscar os períodos de holerite disponíveis
     */
    async function fetchAvailablePeriods() {
        const token = localStorage.getItem('authToken');
        
        if (!token || !employeeCode) {
            console.error("Token ou código do funcionário ausente.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                'http://10.92.11.254:3000/api/payroll/available-periods',
                { employeeCode: employeeCode },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // CORREÇÃO: Acessa o array 'periods' dentro do objeto de resposta
            const transformedData = response.data.periods.map(item => ({
                _year: item.year,
                _month: item.period, 
                
                Ano: item.year,
                Mês: monthNames[item.period - 1],
                Simples: (
                    <BiSolidFilePdf
                        color="#000"
                        size="1.5em"
                        style={{ cursor: 'pointer' }}
                        title="Visualizar Contracheque simples"
                        onClick={() => handlePaycheckView(item.year, item.period, 'simples')} // Chamada para a nova função
                    />
                ),
                Detalhado: (
                    <BiSolidFilePdf
                        color="#000"
                        size="1.5em"
                        style={{ cursor: 'pointer' }}
                        title="Visualizar Contracheque detalhado"
                        onClick={() => handlePaycheckView(item.year, item.period, 'detalhado')} // Chamada para a nova função
                    />
                )
            }));

            setAvailablePeriods(transformedData);
        } catch (error) {
            console.error("Erro ao buscar períodos de holerite:", error);
            if (error.response?.status === 401) {
                alert("Sessão expirada. Faça login novamente.");
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    }

    // Chama a função de busca quando o componente é montado
    useEffect(() => {
        if (employeeCode) {
            fetchAvailablePeriods();
        } else {
            setLoading(false);
            navigate('/login');
        }
    }, []); 

    const columns = [
      { key: "Ano", label: "Ano" },
      { key: "Mês", label: "Mês" },
      { key: "Simples", label: "Contracheque simples" },
      { key: "Detalhado", label: "Contracheque detalhado" }
    ];

    if (loading) {
      return (
        <HomePage>
          <Sidebar />
          <MyGrid>
            <h2>Carregando holerites...</h2>
          </MyGrid>
        </HomePage>
      );
    }

    if (!employeeCode) return null;

    return (
      <HomePage>
        <Sidebar />
        <MyGrid>
          <img src="/rhonlineBlack.svg" alt="Logo" />
          <Grid 
          columns={columns} 
          data={availablePeriods} 
          showAdminControls={true} />
        </MyGrid>
      </HomePage>
    );
}

export default Home;