import { useMemo, useState } from 'react';
import SecTabs from '../components/SecTabs'
import Table from '../components/table/Table';
import Views from '../components/Views';
import Toolbar from '../components/Toolbar';
import { useTableDataContext } from '../hooks/useCustomContext';
import { customerViews } from '../constants/Views'
import AllDefs from '../constants/defs/AllDefs';

// 全部订单
export default function Customer() {
  const tableData = useTableDataContext()
  const columns = useMemo(() => AllDefs, [])
  const features = ["delete", "export", "refresh", 'visibility']
  const [views, setViews] = useState(customerViews)

  return (
    <div className='col full-screen'>
      <div className="tab-contents">
        <Toolbar features={features} />
        <SecTabs />
        <Views
          views={views}
          setViews={setViews}
        />
      </div>
      {tableData &&
        <div className='content-container col'>
          <Table
            data={tableData}
            columns={columns}
          />
        </div>
      }
    </div>
  )
}
