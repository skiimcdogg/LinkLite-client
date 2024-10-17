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
        { showHeaderAndSidebar && (
          <>
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          {/* Barre grise collée sous le header */}
          <div className="bg-gray-400 h-24 fixed top-0 left-0 right-0"></div> {/* Barre grise de 2 unités de hauteur */}
      </>
        )}
        <div className="flex h-screen">
          { showHeaderAndSidebar && <Sidebar isSidebarOpen={isSidebarOpen} /> }
          <div
          className={`flex-1 transition-all duration-300 pt-4 mt-20 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}
          >
            {children}
          </div>
        </div>
      </div>
  );
};

export default Layout;


