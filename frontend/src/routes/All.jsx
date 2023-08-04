import { memo, useMemo, useState } from 'react';
import SecTabs from '../components/SecTabs'
import Table from '../components/Table';
import Views from '../components/Views';
import Toolbar from '../components/Toolbar';
import { useTableDataContext } from '../hooks/useCustomContext';
import { allViews } from '../constants/Views';
import AllDefs from '../constants/AllDefs';
import { useLoaderData } from 'react-router-dom';
import { noData } from '../js/valueCheck';

// 全部订单
const All = () => {
  const tableData = useTableDataContext()
  const loaderData = useLoaderData()
  const columns = useMemo(() => AllDefs, [])
  const features = ["new", "delete", "import", "export", "edit", "startInquiry", "refresh", 'visibility']
  const [views, setViews] = useState(allViews)

  return (
    <div className='col full-screen'>
      <div className="tab-contents">
        <Toolbar features={features} />
        <SecTabs />
        <Views
          views={views}
          setViews={setViews}
          editable
        />
      </div>
      {tableData || loaderData ?
        <div className='content-container col'>
          <Table
            data={noData(tableData) ? loaderData : tableData}
            columns={columns}
          />
        </div> : null
      }
    </div>
  )
}

export default memo(All);