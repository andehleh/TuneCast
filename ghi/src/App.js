import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import LoginForm from "./components/LoginForm";
import HistoryList from "./components/History";
import Signup from "./components/Signup"
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import "./App.css";
import Nav from './components/Nav';



function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Nav />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route exact path="/login" element={<LoginForm />}></Route>
            <Route exact path="/history" element={<HistoryList />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
