
import { Outlet } from 'react-router-dom';
import NavbarHomePage from './Navbarhomepage';
function HomePage(){
    return (
        <>
        <NavbarHomePage/>
        <Outlet/>
         </>
    )
}

export default HomePage;