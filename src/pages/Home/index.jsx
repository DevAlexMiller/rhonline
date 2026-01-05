import { HomePage, MyGrid } from './styles';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Sidebar from '../../components/SideBar';
import Grid from '../../components/Grid';
import { BiSolidFilePdf } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // 🛑 Importação necessária

// Componente para renderizar o ícone SVG do 13º Salário
const ThirteenthIcon = ({ onClick, title }) => (
    <img 
        src="/13.svg"
        alt="13º Salário" 
        style={{ 
            cursor: 'pointer', 
            width: '2.2em', 
            height: '2.2em',
            verticalAlign: 'middle'
        }}
        onClick={onClick}
        title={title}
    />
);

function Home() {
    const navigate = useNavigate();
    const [availablePeriods, setAvailablePeriods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reloadTrigger, setReloadTrigger] = useState(0); 
    const [gerandoPDF, setGerandoPDF] = useState(false); 

    // 🛑 EXTRAÇÃO SEGURA: Decodifica o token para obter o código do funcionário
    const authData = useMemo(() => {
        const token = localStorage.getItem('authToken');
        if (!token) return null;
        try {
            const decoded = jwtDecode(token);
            return {
                token,
                // Certifique-se que o nome da chave aqui (codigoFuncionario) 
                // seja o mesmo que você colocou no payload do JWT no backend
                employeeCode: decoded.codigoFuncionario,
                isAdmin: decoded.isAdmin
            };
        } catch (error) {
            console.error("Erro ao decodificar token:", error);
            return null;
        }
    }, []);

    const monthNames = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;    
    const API_URL_MONTHLY = `${API_BASE_URL}/payroll/available-periods`;
    const API_URL_PAYCHECK = `${API_BASE_URL}/payroll/paycheck`;
    const API_URL_THIRTEENTH = `${API_BASE_URL}/payroll/thirteenth-paycheck`;

    const handleGridReload = () => {
        setReloadTrigger(prev => prev + 1);
    };

    const navigateToHome = () => {
        navigate('/home');
    };

    /**
     * Função para visualizar o PDF
     */
    async function handlePaycheckView(year, month, viewType, dataType) {
        if (!authData?.token || !authData?.employeeCode) {
            navigate('/');
            return;
        }

        setGerandoPDF(true); 
        
        let routeUrl = dataType === 'thirteenth' ? API_URL_THIRTEENTH : API_URL_PAYCHECK;

        try {
            const response = await axios.post(
                routeUrl, 
                {
                    employeeCode: authData.employeeCode, // 🛑 Usando dado do token
                    month: month, 
                    year: year,
                    type: viewType, 
                    asPdf: 'true' 
                },
                {
                    headers: { Authorization: `Bearer ${authData.token}` },
                    responseType: 'blob' 
                }
            );

            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, '_blank');
            
            setTimeout(() => {
                URL.revokeObjectURL(fileURL);
            }, 10000); 

        } catch (error) {
            console.error(`Erro ao visualizar holerite ${viewType}/${dataType}:`, error);
            if (error.response?.status === 401) {
                alert("Sessão expirada. Faça login novamente.");
                navigate('/');
            } else {
                alert(`Falha ao visualizar o holerite ${viewType}.`);
            }
        } finally {
            setGerandoPDF(false); 
        }
    }

    /**
     * Transforma os dados para o Grid
     */
    const transformDataToGrid = (data, isThirteenth = false, parcela = null) => {
        return data.map(item => {
            const monthDisplay = isThirteenth 
                ? `13º Salário (${parcela}ª Parcela)` 
                : monthNames[item.period - 1];
            
            const dataType = isThirteenth ? 'thirteenth' : 'mensal';
            
            let monthToQuery = item.period;
            if (isThirteenth) {
                monthToQuery = parcela === '1' ? 11 : 12;
            }

            const IconComponent = isThirteenth ? ThirteenthIcon : BiSolidFilePdf;

            const getIconProps = (viewType) => {
                const titleText = isThirteenth ? `${monthDisplay} ${viewType}` : `Contracheque ${viewType}`;
                
                const props = {
                    title: `Visualizar ${titleText}`,
                    onClick: () => handlePaycheckView(item.year, monthToQuery, viewType, dataType),
                };
                
                if (!isThirteenth) {
                    props.color = "#000";
                    props.size = "2.2em";
                    props.style = { cursor: 'pointer' };
                }
                return props;
            };
            
            return {
                _year: item.year,
                _month: monthToQuery, 
                _dataType: dataType, 
                Ano: item.year,
                Mês: monthDisplay,
                Simples: (
                    <IconComponent {...getIconProps('simples')} />
                ),
                Detalhado: (
                    <IconComponent {...getIconProps('detalhado')} />
                )
            };
        });
    };

    async function fetchAllPeriods() {
        if (!authData?.token || !authData?.employeeCode) {
            setLoading(false);
            navigate('/');
            return;
        }

        try {
            const monthlyResponse = await axios.post(
                API_URL_MONTHLY,
                { employeeCode: authData.employeeCode }, // 🛑 Usando dado do token
                { headers: { Authorization: `Bearer ${authData.token}` } }
            );

            const monthlyPeriods = monthlyResponse.data.periods || [];
            let finalPeriods = [];

            monthlyPeriods.forEach(item => {
                const isNovember = item.period === 11;
                const isDecember = item.period === 12;
                
                finalPeriods.push(transformDataToGrid([item], false)[0]);
                
                if (isNovember) {
                     finalPeriods.push(transformDataToGrid([{ ...item }], true, '1')[0]);
                }

                if (isDecember) {
                     finalPeriods.push(transformDataToGrid([{ ...item }], true, '2')[0]);
                }
            });

            setAvailablePeriods(finalPeriods);
        } catch (error) {
            console.error("Erro ao buscar todos os períodos de holerite:", error);
            if (error.response?.status === 401) {
                navigate('/');
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (authData) {
            fetchAllPeriods();
        } else {
            setLoading(false);
            navigate('/');
        }
    }, [authData, reloadTrigger]); 

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

    // Se não houver dados de autenticação após o loading, não renderiza nada
    if (!authData) return null;

    return (
      <HomePage>
        <Sidebar />
        <MyGrid>
          <img 
            src="/rhonlineBlack.svg" 
            alt="Logo" 
            onClick={navigateToHome} 
            style={{cursor: 'pointer'}} 
          />
          <Grid 
            columns={columns} 
            data={availablePeriods} 
            showAdminControls={authData.isAdmin} // 🛑 Vem do token agora
            onActionSuccess={handleGridReload} 
          />
        </MyGrid>

        {gerandoPDF && (
          <div
            style={{
              position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.6)", display: "flex", alignItems: "center",
              justifyContent: "center", zIndex: 9999, color: "#fff", flexDirection: "column", fontSize: "1.3em",
            }}
          >
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-white mb-4"></div>
            Gerando PDF...
          </div>
        )}
      </HomePage>
    );
}

export default Home;