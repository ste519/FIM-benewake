import React, { useState} from 'react'
import Toolbar from '../components/Toolbar'
import DatePicker from '../components/DatePicker';

import NewTable from '../components/NewTable';

const New = () => {
    const [type, setType] = useState("销售预测")
    const [invoiceId, setInvoiceId] = useState(); //单据编号
    const [currentDate, setCurrentDate] = useState(new Date());

    return (
        <div className='col full-screen invoice-container'>
            <Toolbar features={["save", "startXD", "status"]} />
            <div className='col invoice-info'>
                <div className='row'>
                    <h1>订单类型：</h1>
                    <label htmlFor="yc" className='row flex-center'>
                        <input type="radio" id="yc" value="yc" checked={type === "yc"} onChange={(e) => setType(e.target.value)} />
                        销售预测
                    </label>
                    <label htmlFor="xd" className='row flex-center'>
                        <input type="radio" id="xd" value="xd" checked={type === "xd"} onChange={(e) => setType(e.target.value)} />
                        销售询单
                    </label>
                </div>
                <div className='row'>
                    <h1>单据编号：</h1>
                    <input type="text" disabled name="invoiceId" value={invoiceId} onChange={(e) => setInvoiceId(e.target.value)} />
                </div>
                <div className="react-datepicker-container">
                    单据日期：
                    <DatePicker
                        selected={currentDate}
                        onChange={(date) => setCurrentDate(date)
                        }
                    />
                </div>
            </div>
            <NewTable />
        </div >

    )
}

export default New