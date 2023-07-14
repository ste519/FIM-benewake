import { useState } from 'react';
import SecTabs from '../components/SecTabs'
import Table from '../components/Table';
import useTabContext from '../hooks/useTabContext';

import Filters from '../components/Filters';
import Presets from '../components/Presets';
import Toolbar from '../components/toolbar';
import useAuth from '../hooks/useAuth';

// 全部订单
export default function All() {
  const { tabContents, currentPreset } = useTabContext()
  const { userInfo } = useAuth()
  const secTabLabels = ["已完成", "未完成"]
  const [presets, setPresets] = useState(userInfo?.presets.all)
  return (
    <div className='col full-screen'>
      <div className="tab-contents">
        <Toolbar path={"all"} />
        <SecTabs labels={secTabLabels} path={"all"} />
        <Presets
          presets={presets}
          setPresets={setPresets}
          secTabs={secTabLabels}
          editable
        />
      </div>
      {(tabContents.all && currentPreset) ? 
      <div className='content-container col'>
        <Filters />
        <Table data={tabContents.all} />
      </div> : <div className="placeholder"></div>}
    </div>
  )
}
