import DatePicker from '../components/DatePicker';
import EditTable from '../components/EditTable';
import { useState, useEffect } from 'react';
import { startInquiry, updateInquiry } from '../api/inquiry';
import { rowToInquiry } from '../js/parseData';
import moment from 'moment';
import { useAlertContext, useSelectedDataContext } from '../hooks/useCustomContext';


const SimpleToolbar = ({ rows, ids, setOpenPopup, isSplitOrderDisabled }) => {
    const { alertSuccess, alertError, alertWarning } = useAlertContext()
    const [action, setAction] = useState(null)

    const handleSaveClick = async () => {
        setAction({ type: "保存", time: new Date() })

        const newInquiries = await Promise.all(rows.map(row => rowToInquiry(row)));

        const res = await updateInquiry(newInquiries)

        if (res?.message.includes('成功')) {
            alertSuccess(res.message)
        }
        else {
            alertError(res.message || "未知错误")
        }
    }

    const handleStartClick = async () => {
        setAction({ type: "开始询单", time: new Date() })

        let newInquiries;
        if (ids) { newInquiries = ids.map((id) => ({ "inquiryId": id })) }

        const res = await startInquiry(newInquiries, 1)
        switch (res.code) {
            case 200:
                alertWarning(res.message)
                break
            case 400:
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
                <button disabled={isSplitOrderDisabled} onClick={() => setOpenPopup(true)}>拆分询单</button>
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
    const { alertError } = useAlertContext()
    const { selectedData, setSelectedData } = useSelectedDataContext()

    const [ids, setIds] = useState([selectedData.inquiryId])
    const [rows, setRows] = useState(Array.isArray(selectedData) ? selectedData : [selectedData])
    const [openPopup, setOpenPopup] = useState(false)
    const [divideNum, setDivideNum] = useState(2)
    const [isSplitOrderDisabled, setIsSplitOrderDisabled] = useState(false)

    const handleSplitOrder = () => {
        if (divideNum < 2) {
            alertError('请输入2或2以上的整数')
            return;
        }
        setIsSplitOrderDisabled(true)
        const newRows = Array(divideNum).fill().map(() => ({
            ...rows[0],
            inquiryId: null,
            saleNum: null
        }));
        setRows(newRows);
    };

    const DividePopup = () => {
        return (
            <div className='col popup-container'>
                <div className='col popup-wrapper g1 flex-center divide-popup'>
                    <div className='row g1 flex-between'>
                        拆分数量：
                        <input value={divideNum} onInput={(e) => setDivideNum(e.target.value)} />
                    </div>
                    <div className='row g1'>
                        <button className='small white bordered' onClick={() => {
                            setOpenPopup(false); setDivideNum(2)
                        }}>取消</button>
                        <button className='small blue40' onClick={() => {
                            handleSplitOrder()
                            setOpenPopup(false)
                        }}
                        >确认</button>
                    </div>
                </div>

            </div>
        )
    }

    console.log(rows);
    useEffect(() => {
        setSelectedData(rows);
    }, [rows]);

    const [currentDate, setCurrentDate] = useState(new Date());

    return (
        <div className='col full-screen invoice-container'>
            <SimpleToolbar rows={rows} ids={ids} setIds={setIds} setOpenPopup={setOpenPopup} isSplitOrderDisabled={isSplitOrderDisabled} />
            <div className='col inquiry-info'>
                <div className='row input-wrapper'>
                    <h1>单据编号：</h1>
                    <input type="text" readOnly name="inquiryCode" value={!isSplitOrderDisabled && rows[0].inquiryCode || ""} className='inquiry-code' />
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
            {openPopup && <DividePopup />}
            {rows && <EditTable rows={rows} setRows={setRows} />}
        </div >

    )
}

export default Edit