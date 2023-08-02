import { useEffect } from 'react'
import Toolbar from '../components/Toolbar';
import Table from '../components/Table'
import InventoryDefs from '../constants/InventoryDefs';
import { useLoaderData } from 'react-router-dom';
import {useTabContext} from '../hooks/useCustomContext';;

// 库存占用情况
export default function Inventory() {

  return (
    <div className='col full-screen'>
      <Toolbar features={['pin', 'unpin', 'refresh', 'export']} />
    </div>
  )
}
