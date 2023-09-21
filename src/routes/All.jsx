import { memo, useMemo, useState, useEffect } from 'react';
import SecTabs from '../components/SecTabs'
import Table from '../components/Table';
import Views from '../components/Views';
import Toolbar from '../components/Toolbar';
import { useTableDataContext } from '../hooks/useCustomContext';
import { allViews } from '../constants/Views';
import AllDefs from '../constants/AllDefs';

const All = () => {
  const tableData = useTableDataContext()
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

export default memo(All);