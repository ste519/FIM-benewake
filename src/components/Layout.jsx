import Navbar from "./Navbar";
import Sidebar from "./sidebar/Sidebar";
import { useState } from "react";

const Layout = ({ children }) => {
    const [showSidebar, setShowSidebar] = useState(true);

    return (
        <div id="app" className="container">
            <Navbar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />
            <div className='row'>
                <Sidebar showSidebar={showSidebar} />
                {children}
            </div>
        </div>)
}

export default Layout