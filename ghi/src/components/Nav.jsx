import { NavLink } from 'react-router-dom';
import useToken from "@galvanize-inc/jwtdown-for-react"
import HistoryModal from "./HistoryModal";

function Nav() {
   const { token } = useToken();
   const { logout } = useToken();
   // const token = "string"

   const handleSubmit = (e) => {
      e.preventDefault();
      logout()
   }

    return(
        <nav id="header" className="w-full z-30 top-10 py-1 bg-white shadow-lg border-b border-blue-400">
      <div className="w-full flex items-center justify-between mt-0 px-6 py-2">
         <label htmlFor="menu-toggle" className="cursor-pointer md:hidden block">
            <svg className="fill-current text-blue-600" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
               <title>menu</title>
               <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
         </label>
         <input className="hidden" type="checkbox" id="menu-toggle"/>

         <div className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1" id="menu">
            <nav>
               <ul className="md:flex items-center justify-between text-base text-blue-600 pt-4 md:pt-0">
               </ul>
            </nav>
         </div>
         <div>
            <NavLink to='/'>Home</NavLink>
         </div>
         <div className="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4" id="nav-content">
            <div className="auth flex items-center w-full md:w-full">
               <div className="flex space-x-2">
                  {/* {token && <NavLink to='/history/' className='k-button k-flat'>History</NavLink>} */}
                  {!token && <NavLink to='/login' className='k-button k-flat'>Login</NavLink>}
                  {!token && <NavLink to='/signup' className='k-button k-flat'>Sign Up</NavLink>}
                  {token && <NavLink to='/' onClick={handleSubmit} className='k-button k-flat'>Logout</NavLink>}
               </div>
            </div>
         </div>
         <HistoryModal />
      </div>
   </nav>
    )
};

export default Nav;
