import Sidebar from './components/Sidebar';
import TabProvider from './context/TabProvider';
import Navbar from './components/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export default function App() {
    const navigate = useNavigate();
    useEffect(() => navigate('/user'), [])
    return (
        <TabProvider>
            <div id="app" className="container">
                <Navbar />
                <div className='row'>
                    <Sidebar />
                    <Outlet />
                </div>
            </div>
        </TabProvider>
    )
}
