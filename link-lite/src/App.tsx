import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import UserPage from "./Components/UserPage/UserPage";
import About from "./Components/About/About";
import UserSignIn from "./Components/UserCredentials/UserSignIn";
import UserSignUp from "./Components/UserCredentials/UserSignUp";
import UserCheckEmail from "./Components/UserCredentials/UserCheckEmail";
import UserEmailVerification from "./Components/UserCredentials/UserEmailVerification";
import Layout from "./Components/Layout/Layout";

function App() {
  return (
    <Router>
      <Layout>
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
      </Layout>
    </Router>
  );
}

export default App;
