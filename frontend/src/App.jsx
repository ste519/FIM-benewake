
import TabProvider from './providers/TabProvider';
import RequireAuth from './components/RequireAuth';
import TableProvider from './providers/TableProvider';
import SelectedDataProvider from './providers/SelectedDataProvider';
import Layout from './components/Layout';

export default function App() {
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
