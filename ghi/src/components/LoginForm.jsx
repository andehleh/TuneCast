import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import SignupModal from "./Modals/SignupModal";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    navigate("/");
    setShow(false);
  };

  return (
    <>
      <Button variant="" onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose} size="x20">
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-md-5 mt-md-4 pb-5">
            <p className="text-black-50 mb-5 fw-bold">
              Please enter your login and password!
            </p>

            <div className="form-outline form-white mb-4">
              <input
                type="text"
                id="typeUsernameX"
                className="form-control form-control-lg bg-dark text-white border-white"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-outline form-white mb-4">
              <input
                type="password"
                id="typePasswordX"
                className="form-control form-control-lg bg-dark text-white border-white"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="btn btn-outline-dark btn-lg px-5"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
          {/* <div>
            <p className="mb-2">
              <Link to="/forgot_password" className="text-white-50 fw-bold">
                Forgot Password?
              </Link>
            </p>

            <p className="mb-0">
              Don't have an account?{" "}
              <Link to="/signup/" className="text-black-50 fw-bold">
                <SignupModal />
              </Link>
            </p>
          </div> */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginForm;
