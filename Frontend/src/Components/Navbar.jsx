import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContextProvider";
function Navbar() {
  const {user,logout}=useContext(UserContext);
  const email=user.email || "";
  return (
    <nav className="bg-blue-600 text-white px-4 py-2">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h2 className="text-2xl font-bold">Expense Manager</h2>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-4 items-center">
          <li>
           {
            !email &&
            <Link to={"/"}>
            <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 transition">
              Login/Register
            </button>
            </Link>
           }
            
          </li>
          <li>
           <Link to={"/manager"}>
           <button className="bg-purple-500 px-4 py-2 rounded hover:bg-purple-700 transition">
              Expense Tracker
            </button>
           </Link>
          </li>
          <li>
          
          {
            user.email &&  
          <button 
          className="bg-purple-500 px-4 py-2 rounded hover:bg-purple-700 transition"
          onClick={logout}
          >
            Logout
        </button>
          }
          
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            type="button"
            className="text-white focus:outline-none hover:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar