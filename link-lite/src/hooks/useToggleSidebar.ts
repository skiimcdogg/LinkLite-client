import { useState } from "react";

const useToggleSidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const toggleSidebar = (isSidebarOpen: boolean) => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return { isSidebarOpen, toggleSidebar}
}

export default useToggleSidebar;