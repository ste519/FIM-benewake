import DatePicker from '../components/DatePicker';
import NewTable from '../components/NewTable';
import { useState } from 'react';

import { NEW_INQUIRY_DATA } from '../constants/Global';
import { startInquiry } from '../api/inquiry';
import { rowToInquiry } from '../js/parseData';
import moment from 'moment';
import { useAlertContext, useAuthContext } from '../hooks/useCustomContext';

const SimpleToolbar = ({ rows, inquiryType, ids, setIds }) => {
    const { alertWarning, alertError, alertSuccess, alertConfirm } = useAlertContext()
    const [action, setAction] = useState(null)

    const handleSaveClick = async () => {
        setAction({ type: "保存", time: new Date() })

        const newInquiries = await Promise.all(rows.map(row => rowToInquiry(row, inquiryType)));

        const res = await startInquiry(newInquiries, 0)
        switch (res.code) {
            case 200:
                alertSuccess(res.message)
                setIds(res.data.ids)
                break
            case 400:
                alertError(res.message)
                break
            case 1:
                alertError(res.message)
                break
            default:
                alertError("未知错误")
                break
        }
    }

    const handleStartClick = async () => {
        setAction({ type: "开始询单", time: new Date() })

        let newInquiries;
        if (ids) { newInquiries = ids.map((id) => ({ "inquiryId": id })) }
        else { newInquiries = await Promise.all(rows.map(row => rowToInquiry(row, inquiryType))) }

        const res = await startInquiry(newInquiries, 1)
        switch (res.code) {
            case 200:
                alertWarning(res.message)
                if (!ids) setIds(res.data.ids)
                break
            case 400:
                alertError(res.message)
                break
            case 1:
                alertError(res.message)
                break
            default:
                alertError("未知错误")
                break
        }

    }

    return (
        <div className='row toolbar' >
            <div className='row flex-center'>
                <button onClick={handleSaveClick} >保存</button>
                <button onClick={handleStartClick}>开始询单</button>
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

const New = () => {
    const [inquiryType, setInquiryType] = useState(null)
    const [currentDate, setCurrentDate] = useState(new Date());
    const [ids, setIds] = useState(null)
    const { auth } = useAuthContext()
    const new_inquiry_data = { ...NEW_INQUIRY_DATA, salesmanName: auth.username }
    const [rows, setRows] = useState([new_inquiry_data])

    return (
        <div className='col full-screen invoice-container'>
            <SimpleToolbar rows={rows} inquiryType={inquiryType} ids={ids} setIds={setIds} />
            <div className='col inquiry-info'>
                <div className='row'>
                    <h1>订单类型：</h1>
                    <label htmlFor="yc" className='row flex-center'>
                        <input
                            type="radio" id="yc" value="yc"
                            checked={inquiryType === 4}
                            onChange={() => setInquiryType(4)} />
                        销售预测
                    </label>
                    <label htmlFor="xd" className='row flex-center'>
                        <input
                            type="radio" id="xd" value="xd"
                            checked={inquiryType === 5}
                            onChange={() => setInquiryType(5)} />
                        销售询单
                    </label>
                </div>
                <div className="react-datepicker-container input-wrapper">
                    单据日期：
                    <DatePicker
                        selected={currentDate}
                        onChange={(date) => setCurrentDate(date)
                        }
                    />
                </div>
            </div>
            <NewTable rows={rows} setRows={setRows} />
        </div >

    )
}

export default New