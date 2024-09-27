import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import authApiHandler from "../../services/authApiHandler";

function Header() {
  const { user, clearUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authApiHandler.logout();
      clearUser();
      navigate("/");
    } catch (err) {
      console.error("Logout error.", err);
    }
  };

  return (
    <div>
      <h1>LinkLite</h1>
      {
      user ? <button onClick={handleLogout}>Logout</button> : 
      <Link to={"/login"}>Login</Link>
      }
    </div>
  );
}

export default Header;
