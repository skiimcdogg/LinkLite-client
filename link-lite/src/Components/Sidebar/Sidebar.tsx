import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

type SidebarProps = {
  isSidebarOpen: boolean;
};

function Sidebar({ isSidebarOpen }: SidebarProps) {
  const { user } = useUser();
  return (
    <div
      className={`z-10 fixed top-16 left-0 h-full transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="bg-retroRed w-64 pt-16 shadow-xl h-full">
        <div className="mb-1">
          <Link to={"/"} className="block font-SidebarRetro text-4xl hover:text-retroBlue pl-4 py-2">
            Home
          </Link>
        </div>
        <div className="mb-1">
          {user ? (
            <Link
              to={"/my-page"}
              className="block font-SidebarRetro text-2xl hover:text-retroBlue pl-4 py-2"
            >
              My Page
            </Link>
          ) : (
            <Link
              to={"/login"}
              className="block font-SidebarRetro text-2xl hover:text-retroBlue pl-4 py-2"
            >
              My Page
            </Link>
          )}
        </div>
        <Link to={"/about"} className="block font-SidebarRetro text-2xl hover:text-retroBlue pl-4 py-2">
          About
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
