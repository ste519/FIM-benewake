import DatePicker from '../components/DatePicker';
import EditTable from '../components/EditTable';
import { useState, useEffect } from 'react';

import { startInquiry } from '../api/inquiry';
import { parseInquiryObj, rowToInquiry } from '../js/parseData';
import moment from 'moment';
import { useAlertContext, useSelectedDataContext } from '../hooks/useCustomContext';
import { snakeToCamelCase } from '../js/transformType';
import { noData } from '../js/valueCheck';

const SimpleToolbar = ({ rows }) => {
    const updateAlert = useAlertContext()
    const [action, setAction] = useState(null)
    const { setSelectedData } = useSelectedDataContext()

    const handleClick = async (status) => {
        setAction({ type: status === 1 ? "开始询单" : "保存", time: new Date() })

        const newInquiries = rows.map(row => rowToInquiry(row))
        console.log(newInquiries);
        const res = await startInquiry(newInquiries, status)
        switch (res.code) {
            case 200:
                updateAlert({
                    type: "SHOW_ALERT", data: {
                        type: "success",
                        message: res.message
                    }
                })
                setSelectedData(rows[0])
                break
            case 400:
                updateAlert({
                    type: "SHOW_ALERT", data: {
                        type: "error",
                        message: res.message
                    }
                })
                break
            case 1:
                updateAlert({
                    type: "SHOW_ALERT", data: {
                        type: "error",
                        message: res.message
                    }
                })
                break
            default:
                updateAlert({
                    type: "SHOW_ALERT", data: {
                        type: "error",
                        message: "未知错误"
                    }
                })
                break
        }

    }

    return (
        <div className='row toolbar' >
            <div className='row flex-center'>
                <button onClick={() => handleClick(0)} >保存</button>
                <button onClick={() => handleClick(1)}>开始询单</button>
            </div>
            <div className="row flex-center status">
                {action &&
                    <span>
                        <strong>{action.type}</strong>
                        &nbsp;于&nbsp;
                        <strong>{`${moment(action.time).format('lll')}`}</strong>
                    </span>
                }
            </div>
        </div >
    )

}

const Edit = () => {
    const { selectedData } = useSelectedDataContext()
    if (!noData(selectedData)) {
        let initialData;
        useEffect(() => {
            async function fetch() {
                initialData = await (parseInquiryObj(selectedData))
                Object.entries(selectedData).forEach(([key, value]) => {
                    const camelCaseKey = snakeToCamelCase(key)
                    initialData[camelCaseKey] = value
                })
                setRows([initialData])
            }
            fetch()
        }, [])
        const [inquiryCode, setInquiryCode] = useState(selectedData?.inquiry_code); //单据编号
        const [currentDate, setCurrentDate] = useState(new Date());
        const [rows, setRows] = useState(null)

        return (
            < div className='col full-screen invoice-container' >
                <SimpleToolbar rows={rows} />
                <div className='col invoice-info'>
                    <div className='row'>
                        <h1>单据编号：</h1>
                        <input type="text" disabled name="inquiryCode" value={inquiryCode} onChange={(e) => setInquiryCode(e.target.value)} />
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
                {rows && <EditTable rows={rows} setRows={setRows} />}
            </div >
        )
    }
}

export default Edit