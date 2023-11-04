import { useEffect, useMemo, useState } from 'react';
import SecTabs from '../components/SecTabs'
import Table from '../components/table/Table';
import Views from '../components/Views';
import Toolbar from '../components/Toolbar';
import { useTableDataContext } from '../hooks/useCustomContext';
import AllDefs from '../constants/defs/AllDefs';
import { fetchDeliveryUpdates } from '../api/fetch';
import { useSelectedDataContext } from '../hooks/useCustomContext';

const deliveryViews =
{
  default: [
    { "viewId": 0, "viewName": "我的" },
    { "viewId": -1, "viewName": "已签收" },
    { "viewId": -2, "viewName": "已发货客户未签收" },
    { "viewId": -3, "viewName": "未发货" },
    { "viewId": -4, "viewName": "海外订单" }
  ],
  complete: [
    { "viewId": 0, "viewName": "我的" },
    { "viewId": -1, "viewName": "已签收" },
    { "viewId": -2, "viewName": "已发货客户未签收" },
    { "viewId": -4, "viewName": "海外订单" },
  ],
  incomplete: [
    { "viewId": 0, "viewName": "我的" },
    { "viewId": -3, "viewName": "未发货" }
  ]
}


// 全部订单
export default function Delivery() {
  const tableData = useTableDataContext()
  const columns = useMemo(() => AllDefs, [])
  const features = ["delete", "export", "refresh", 'visibility']
  const [views, setViews] = useState([])
  const { selectedQuery } = useSelectedDataContext()
  const secTab = selectedQuery[6].secTab

  useEffect(() => {
    fetchDeliveryUpdates()
  }, [])

  useEffect(() => {
    if (secTab === "已完成") { setViews(deliveryViews.complete) }
    else if (secTab === null) { setViews(deliveryViews.default) }
    else { setViews(deliveryViews.incomplete) }
  }, [secTab])

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
