import TabControls from '../components/TabControls'
import Table from '../components/Table';
import useTabContext from '../context/TabProvider';

// 全部订单
export default function All() {
  const {tabContents} =  useTabContext()
  return (
    <div className='col full-screen'>
      <TabControls path="all"/>
      {tabContents.all && <Table data={tabContents.all}/>}
    </div>
  )
}
