import { HomePage, MyGrid } from './styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/SideBar';
import Grid from '../../components/Grid';
import { BiSolidFilePdf } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

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

const navigateToHome = () => {
    navigate('/home');
};

function Home() {
    const navigate = useNavigate();
    const [availablePeriods, setAvailablePeriods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reloadTrigger, setReloadTrigger] = useState(0); 
    const [gerandoPDF, setGerandoPDF] = useState(false); // 👈 NOVO estado de carregamento do PDF

    const employeeCode = localStorage.getItem('codigoFuncionario'); 

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


    async function handlePaycheckView(year, month, viewType, dataType) {
        const token = localStorage.getItem('authToken');
        
        if (!token || !employeeCode) {
            navigate('/');
            return;
        }

        setGerandoPDF(true); // 👈 Ativa o aviso visual de geração de PDF
        
        let routeUrl;
        if (dataType === 'thirteenth') {
            routeUrl = API_URL_THIRTEENTH;
        } else {
            routeUrl = API_URL_PAYCHECK;
        }
        
        const targetMonth = dataType === 'thirteenth' ? 12 : month;

        try {
            const response = await axios.post(
                routeUrl, 
                {
                    employeeCode: employeeCode,
                    month: targetMonth, 
                    year: year,
                    type: viewType, 
                    asPdf: 'true' 
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
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
            setGerandoPDF(false); // 👈 Desativa o aviso após o processo
        }
    }


    const transformDataToGrid = (data, isThirteenth = false) => {
        return data.map(item => {
            const monthDisplay = isThirteenth ? '13º Salário' : monthNames[item.period - 1];
            const dataType = isThirteenth ? 'thirteenth' : 'mensal';
            
            const IconComponent = isThirteenth ? ThirteenthIcon : BiSolidFilePdf;

            const getIconProps = (viewType) => {
                const titleText = isThirteenth ? `${monthDisplay} ${viewType}` : `Contracheque ${viewType}`;
                
                const commonProps = {
                    title: `Visualizar ${titleText}`,
                    onClick: () => handlePaycheckView(item.year, item.period, viewType, dataType),
                };
                
                if (isThirteenth) {
                    return commonProps;
                } else {
                    return {
                        ...commonProps,
                        color: "#000",
                        size: "2.2em",
                        style: { cursor: 'pointer' }
                    };
                }
            };
            
            return {
                _year: item.year,
                _month: item.period, 
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
        setLoading(true);
        const token = localStorage.getItem('authToken');
        
        if (!token || !employeeCode) {
            setLoading(false);
            navigate('/');
            return;
        }

        try {
            const monthlyResponse = await axios.post(
                API_URL_MONTHLY,
                { employeeCode: employeeCode },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const monthlyPeriods = monthlyResponse.data.periods || [];
            let finalPeriods = [];

            monthlyPeriods.forEach(item => {
                const isNovember = item.period === 11;
                const isDecember = item.period === 12;
                
                finalPeriods.push(transformDataToGrid([item], false)[0]);
                
                if (isNovember) {
                     finalPeriods.push(transformDataToGrid([{ year: item.year, period: item.period }], true)[0]);
                }

                if (isDecember) {
                     finalPeriods.push(transformDataToGrid([{ year: item.year, period: item.period }], true)[0]);
                }
            });

            setAvailablePeriods(finalPeriods);
        } catch (error) {
            console.error("Erro ao buscar todos os períodos de holerite:", error);
            if (error.response?.status === 401) {
                alert("Sessão expirada. Faça login novamente.");
                navigate('/');
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (employeeCode) {
            fetchAllPeriods();
        } else {
            setLoading(false);
            navigate('/');
        }
    }, [employeeCode, reloadTrigger]); 

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
          <img src="/rhonlineBlack.svg" alt="Logo" onClick={navigateToHome} style={{cursor: 'pointer'}} />
          <Grid 
            columns={columns} 
            data={availablePeriods} 
            showAdminControls={true}
            onActionSuccess={handleGridReload} 
          />
        </MyGrid>

        {/* 👇 Sobreposição enquanto o PDF é gerado */}
        {gerandoPDF && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              color: "#fff",
              flexDirection: "column",
              fontSize: "1.3em",
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