import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import useToggleSidebar from "../../hooks/useToggleSidebar";


function Layout({ children }: {children: React.ReactNode}) {
    const { isSidebarOpen, toggleSidebar } = useToggleSidebar();
    const location = useLocation();

    const showHeaderAndSidebar = location.pathname !== '/verify-email';

  return (
    <div className="App">
        { showHeaderAndSidebar && <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} /> }
        <div className="mt-20">
          { showHeaderAndSidebar && <Sidebar isSidebarOpen={isSidebarOpen} /> }
          <div>
            {children}
          </div>
        </div>
      </div>
  );
};

export default Layout;