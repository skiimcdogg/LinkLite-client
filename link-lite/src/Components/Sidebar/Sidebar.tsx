import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function Sidebar() {
  const { user } = useUser();
  return (
    <div>
      <h1>Sidebar</h1>
      <Link to={"/"}>home</Link>
      {user ? <Link to={"/my-page"}>My infos & Urls</Link> : <p></p>}
      <Link to={"/about"}>About</Link>
    </div>
  );
}

export default Sidebar;
