import Sidebar from './components/Sidebar';
import TabProvider from './providers/TabProvider';
import Navbar from './components/Navbar';
import { useState } from 'react';
import RequireAuth from './components/RequireAuth';
import TableProvider from './providers/TableProvider';
import SelectedDataProvider from './providers/SelectedDataProvider';

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

export default function App() {
    console.log("Rendered app");

    return (
        <TabProvider>
                <SelectedDataProvider>
                    <TableProvider>
                        <Layout>
                            <RequireAuth />
                        </Layout>
                    </TableProvider>
                </SelectedDataProvider>
        </TabProvider>
    )
}
