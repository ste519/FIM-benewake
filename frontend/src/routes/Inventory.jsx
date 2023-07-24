import { useEffect } from 'react'
import Toolbar from '../components/Toolbar';
import Table from '../components/Table'
import InventoryDefs from '../column-defs/InventoryDefs';
import { useLoaderData } from 'react-router-dom';
import useTabContext from '../hooks/useTabContext';

// 库存占用情况
export default function Inventory() {
  const data = useLoaderData()
  const { tabContents, setTabContents } = useTabContext()
  useEffect(() => {
    setTabContents({ ...tabContents, "inventory": data })
  }, [])
  return (
    <div className='col full-screen'>
      <Toolbar features={['pin', 'unpin', 'refresh', 'export']} />
      <Table data={data} columns={InventoryDefs} showVisibility={false} />
    </div>
  )
}
