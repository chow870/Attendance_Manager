
import { Link,NavLink } from "react-router-dom"
function NavbarDashboard(){
    return (
        <>
          {/* for today wala done hai */}
          <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-white text-lg font-bold">
          <Link to="/dashboard">
            {/* Replace this text with an actual logo image */}
            <span>Company Logo</span>
          </Link>
        </div>
        
        {/* Navigation Links */}
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
          </li>
        </ul>
      </div>
    </nav>
        </>
    )
}

export default NavbarDashboard