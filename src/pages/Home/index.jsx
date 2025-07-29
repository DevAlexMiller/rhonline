import { HomePage, HomeContent } from './styles';
import { useSearchParams } from 'react-router-dom';
import SideBar from '../../components/SideBar';

function Home(){
    const [searchParams] = useSearchParams();
    const description = searchParams.get('description')
    console.log("CPF recebido:", description)

    return (
        <HomePage>
            <SideBar>

            </SideBar>
            <HomeContent>

            </HomeContent>
        </HomePage>
    )
}

export default Home;