import { Link, NavLink } from "react-router-dom"
function NavbarHomePage(){
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
              to="/signin"
              className={({ isActive }) =>
                `hover:text-gray-300 transition duration-200 ${isActive ? "font-extrabold text-xl" : ""}`
              }
              >
             SignIn
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `hover:text-gray-300 transition duration-200 ${isActive ? "font-extrabold text-xl" : ""}`
              }
            >
            SignUp
            </NavLink>
          </li>
          
        </ul>
      </div>
    </nav>
        </>
    )
}

export default NavbarHomePage