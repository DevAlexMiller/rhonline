import { HomePage, MyGrid } from './styles';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../../components/SideBar';
import Grid from '../../components/Grid';
import contracheques from '../../components/Grid/contracheques.json';
import { BiSolidFilePdf } from 'react-icons/bi';

function Home() {
  const [searchParams] = useSearchParams();
  const description = searchParams.get('description');
  console.log("CPF recebido:", description);

  // Converte o objeto em array
  const listaContracheques = Object.values(contracheques);

  // Adiciona os ícones antes de mandar para o Grid
  const dadosComIcones = listaContracheques.map(item => ({
    Ano: item.Ano,
    Mês: item.Mês,
    Simples: (
      <BiSolidFilePdf
        color="#000"
        size="1.5em"
        style={{ cursor: 'pointer' }}
        title="Baixar Contracheque simples"
        onClick={() =>
          console.log(`Baixar simples: ${item.Ano}-${item.Mês}`)
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
          console.log(`Baixar detalhado: ${item.Ano}-${item.Mês}`)
        }
      />
    )
  }));

  const columns = [
    { key: "Ano", label: "Ano" },
    { key: "Mês", label: "Mês" },
    { key: "Simples", label: "Contracheque simples" },
    { key: "Detalhado", label: "Contracheque detalhado" }
  ];

  return (
    <HomePage>
      <Sidebar isAdmin={true} />
      <MyGrid>
        <img src="/rhonlineBlack.svg" alt="Logo" />
        <Grid columns={columns} data={dadosComIcones} />
      </MyGrid>
    </HomePage>
  );
}

export default Home;
