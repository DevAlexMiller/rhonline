import { HomePage} from './styles';
import { MyGrid } from './styles';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../../components/SideBar';
import Grid from '../../components/Grid';

function Home(){
    const [searchParams] = useSearchParams();
    const description = searchParams.get('description')
    console.log("CPF recebido:", description)

    return (
        <HomePage>
            <Sidebar isAdmin={true} />
            <MyGrid>
                <img src="/rhonlineBlack.svg" />
                <Grid />
            </MyGrid>
        </HomePage>

    )
}

export default Home;