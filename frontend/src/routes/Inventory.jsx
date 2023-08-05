import { useEffect } from 'react'
import Toolbar from '../components/Toolbar';
import Table from '../components/Table'
import InventoryDefs from '../constants/InventoryDefs';
import { useLoaderData } from 'react-router-dom';
import {useTabContext} from '../hooks/useCustomContext';;

// 库存占用情况
export default function Inventory() {
  console.log("inventory rerender");
  return (
    <div className='col full-screen'>
    </div>
  )
}
