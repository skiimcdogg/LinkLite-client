import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

type SidebarProps = {
  isSidebarOpen: boolean
}

function Sidebar({ isSidebarOpen }: SidebarProps) {
  const { user } = useUser();
  return (
    <div>
      <div className={`fixed top-16 left-0 w-64 pt-10 bg-gradient-to-r from-sidebarBackground to-headerBackground h-full transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} shadow-xl`}>
        <h1>Sidebar</h1>
        <div className="mb-1">
        <Link to={"/"} className="hover:text-neonBlue">home</Link>
        </div>
        <div className="mb-1">
        {user ? <Link to={"/my-page"}>My infos & Urls</Link> : <p></p>}
        </div>
        <Link to={"/about"} className="hover:text-neonBlue">About</Link>
      </div>
    </div>
  );
}

export default Sidebar;
