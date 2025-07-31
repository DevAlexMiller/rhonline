import { HomePage} from './styles';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../../components/SideBar';

function Home(){
    const [searchParams] = useSearchParams();
    const description = searchParams.get('description')
    console.log("CPF recebido:", description)

    return (
        <HomePage>
            <Sidebar isAdmin={true}/>
        </HomePage>
    )
}

export default Home;