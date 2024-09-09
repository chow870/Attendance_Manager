
import { Link,NavLink } from "react-router-dom"
function NavbarDashboard(){
    return (
        <>
          
          <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        
        <div className="text-white text-lg font-bold">
          <Link to="/dashboard">
            
            <span>Company Logo</span>
          </Link>
        </div>
        
       
        <ul className="flex space-x-4 text-white">
          <li>
            <NavLink
              to="/dashboard/allrecords"
              className={({ isActive }) =>
                `hover:text-gray-300 transition duration-200 ${isActive ? "font-extrabold text-xl" : ""}`
              }
            >
              All Records
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/attendancesubj"
              className={({ isActive }) =>
                `hover:text-gray-300 transition duration-200 ${isActive ? "font-extrabold text-xl" : ""}`
              }
            >
              Attendance Subj
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/missedclasses"
              className={({ isActive }) =>
                `hover:text-gray-300 transition duration-200 ${isActive ? "font-extrabold text-xl" : ""}`
              }
            >
              Missed Classes
            </NavLink>
            <li>
              <Link
              to="/dashboard/signout"
              >

              </Link>
            </li>
            
          </li>
        </ul>
      </div>
    </nav>
        </>
    )
}

export default NavbarDashboard