import NavbarDashboard from './Navbar_Dashboard';
import { Outlet } from 'react-router-dom';
function Dashboard(){
    return (
        <>
        <NavbarDashboard/>
        <Outlet/>
         </>
    )
}

export default Dashboard;