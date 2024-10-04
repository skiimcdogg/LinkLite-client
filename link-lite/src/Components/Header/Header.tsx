import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import authApiHandler from "../../services/authApiHandler";


type HeaderProps = {
  toggleSidebar: (isSidebarOpen: boolean) => void,
  isSidebarOpen: boolean
}

function Header({ toggleSidebar, isSidebarOpen }: HeaderProps) {
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
    <div className="fixed top-0 left-0 right-0 bg-headerBackground shadow-neon h-16 flex items-center justify-between px-4 z-50">
      <button onClick={() => toggleSidebar(isSidebarOpen)} className="text-2xl p-2 focus:outline-none">
        <div className={`transform transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : 'rotate-0'}`}>
        &#x25B6; {/*Right arrow symbol*/}
        </div>
      </button>
      <h1>LinkLite</h1>
      {
      user ? <button onClick={handleLogout}>Logout</button> : 
      <Link to={"/login"}>Login</Link>
      }
    </div>
  );
}

export default Header;
