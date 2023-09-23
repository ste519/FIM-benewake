import DatePicker from '../components/DatePicker';
import NewTable from '../components/NewTable';
import { useState, useEffect } from 'react';

import { NEW_INQUIRY_DATA } from '../constants/Global';
import { startInquiry } from '../api/inquiry';
import { rowToInquiry } from '../js/parseData';
import moment from 'moment';
import { useAlertContext, useAuthContext, useSelectedDataContext } from '../hooks/useCustomContext';

function alertAndSetRows(res, updateAlert, action) {
    switch (res.code) {
        case 200:
            updateAlert({
                type: "SHOW_ALERT", data: {
                    type: "success",
                    message: res.message
                }
            })
            action()
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

const SimpleToolbar = ({ rows, inquiryType, setRows }) => {
    const updateAlert = useAlertContext()
    const [action, setAction] = useState(null)

    const handleSaveClick = async () => {
        setAction({ type: "保存", time: new Date() })

        const newInquiries = rows.map(row => rowToInquiry(row, inquiryType));

        const res = await startInquiry(newInquiries, 0)
        const saveInquiryIdAndCode = () => {
            const { ids, inquiryCode } = res.data;

            const newArray = rows.map((row, i) =>
            ({
                ...row,
                inquiryId: ids[i],
                inquiryCode: inquiryCode[i],
            }))
            setRows(newArray);
        }
        alertAndSetRows(res, updateAlert, saveInquiryIdAndCode)
    }

    const handleStartClick = async () => {
        setAction({ type: "开始询单", time: new Date() })

        let newInquiries;
        newInquiries = rows.map(
            row => row.inquiryId ?
                { inquiryId: row.inquiryId }
                : rowToInquiry(row, inquiryType)
        )

        const res = await startInquiry(newInquiries, 1)

        const saveInquiryIdAndCode = () => {
            const { ids, inquiryCode } = res.data;

            const newArray = rows.map((row) =>
                row.inquiryId ?
                    row :
                    {
                        ...row,
                        inquiryId: ids.shift(),
                        inquiryCode: inquiryCode.shift()
                    })
            setRows(newArray);
        }
        alertAndSetRows(res, updateAlert, saveInquiryIdAndCode)
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
    const { auth } = useAuthContext()
    const { savedNewData, setSavedNewData } = useSelectedDataContext()

    const new_inquiry_data = { ...NEW_INQUIRY_DATA, salesmanName: auth.userType == "2" ? auth.username : "" }
    const [rows, setRows] = useState(savedNewData ?? [new_inquiry_data])

    useEffect(() => { setSavedNewData(rows) }, [rows])


    return (
        <div className='col full-screen invoice-container'>
            <SimpleToolbar rows={rows} inquiryType={inquiryType} setRows={setRows} />
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