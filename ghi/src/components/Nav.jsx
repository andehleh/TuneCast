import { NavLink } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import HistoryModal from "./Modals/HistoryModal";
import LoginModal from "./Modals/LoginModal";
import SignupModal from "./Modals/SignupModal";
import ForgotPasswordModal from "./ForgotPassword";





function Nav() {
  const { token } = useToken();
  const { logout } = useToken();

   const handleSubmit = (e) => {
      e.preventDefault();
      logout()
   }

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <img src="/tunecast.jpg" alt="Logo" />
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {token && (
              <li className="nav-item active">
                <HistoryModal/>
              </li>
            )}

          {!token && (
            <li className="nav-item active">
              <LoginModal />
            </li>
          )}
          {!token && (
            <li className="nav-item active">
              <SignupModal />
            </li>
          )}
          {token && (
            <li className="nav-item active">
              <NavLink className="nav-link" to="/" onClick={handleSubmit}>
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
