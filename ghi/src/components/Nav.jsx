import { NavLink } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import HistoryModal from "./Modals/HistoryModal";
import SignupModal from "./Modals/SignupModal";
import ForgotPasswordModal from "./ForgotPassword";
import LoginForm from "./LoginForm";
import Signup from "./Signup";




import imageContent from './music-cloud.png'

function Nav() {
  const { token } = useToken();
  const { logout } = useToken();

  const handleSubmit = (e) => {
    e.preventDefault();
    logout()
  }

    return (

      <nav className="navbar navbar-expand-lg navbar-light ml-1"
        style={{
          backgroundColor: 'rgba(252, 252, 252, 0.4)',
          padding: 0
        }}
      >

        <NavLink className="navbar-brand" href="#"
          style={{
          marginLeft: '20px'
          }}
        >
          <img src={imageContent} width="40" height="40" className="d-inline-block align-top" alt="TuneCast"/>
        </NavLink>
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
              <LoginForm />
            </li>
          )}
          {!token && (
            <li className="nav-item active">
              <Signup />
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
