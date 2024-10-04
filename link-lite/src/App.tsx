import "./App.css";
import Header from "./Components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import UserPage from "./Components/UserPage/UserPage";
import About from "./Components/About/About";
import UserSignIn from "./Components/UserCredentials/UserSignIn";
import UserSignUp from "./Components/UserCredentials/UserSignUp";
import Sidebar from "./Components/Sidebar/Sidebar";
import UserCheckEmail from "./Components/UserCredentials/UserCheckEmail";
import UserEmailVerification from "./Components/UserCredentials/UserEmailVerification";
import useToggleSidebar from "./hooks/useToggleSidebar";

function App() {
  const { isSidebarOpen, toggleSidebar } = useToggleSidebar();

  return (
    <Router>
      <div className="App">
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="mt-20">
          <Sidebar isSidebarOpen={isSidebarOpen} />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/my-page" element={<UserPage />} />
              <Route path="/login" element={<UserSignIn />} />
              <Route path="/signup" element={<UserSignUp />} />
              <Route path="/verify-email" element={<UserCheckEmail />} />
              <Route
                path="/email-verification"
                element={<UserEmailVerification />}
              />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
