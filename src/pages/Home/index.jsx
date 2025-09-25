import { HomePage, MyGrid } from './styles';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/SideBar';
import Grid from '../../components/Grid';
import { BiSolidFilePdf } from 'react-icons/bi';

function Home() {
    const [searchParams] = useSearchParams();
    const [availablePeriods, setAvailablePeriods] = useState([]);
    const [loading, setLoading] = useState(true);
    const employeeCode = searchParams.get('description');

    // Mapeamento de números de mês para nomes em português
    const monthNames = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    // Função para buscar os períodos de holerite disponíveis
    async function fetchAvailablePeriods() {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
            console.error("Token não encontrado. Redirecione para o login.");
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

            // Transforma o array de retorno para o formato que o Grid espera
            const transformedData = response.data.map(item => ({
                Ano: item.year,
                Mês: monthNames[item.period - 1],
                Simples: (
                    <BiSolidFilePdf
                        color="#000"
                        size="1.5em"
                        style={{ cursor: 'pointer' }}
                        title="Baixar Contracheque simples"
                        onClick={() =>
                            console.log(`Baixar simples: ${item.year}-${item.period}`)
                        }
                    />
                ),
                Detalhado: (
                    <BiSolidFilePdf
                        color="#000"
                        size="1.5em"
                        style={{ cursor: 'pointer' }}
                        title="Baixar Contracheque detalhado"
                        onClick={() =>
                            console.log(`Baixar detalhado: ${item.year}-${item.period}`)
                        }
                    />
                )
            }));

            setAvailablePeriods(transformedData);
        } catch (error) {
            console.error("Erro ao buscar períodos de holerite:", error);
            // Lida com erros de token expirado ou inválido
            if (error.response?.status === 401) {
                // Lógica para deslogar o usuário ou redirecioná-lo
                // localStorage.removeItem('authToken');
                // navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    }

    // Chama a função de busca quando o componente é montado
    useEffect(() => {
        if (employeeCode) {
            fetchAvailablePeriods();
        }
    }, [employeeCode]);

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

    return (
      <HomePage>
        <Sidebar />
        <MyGrid>
          <img src="/rhonlineBlack.svg" alt="Logo" />
          <Grid columns={columns} data={availablePeriods} />
        </MyGrid>
      </HomePage>
    );
}

export default Home;