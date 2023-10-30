import React from 'react'
import { ReactComponent as CloseIcon } from '../assets/icons/cross.svg'
import { Link } from 'react-router-dom';
import { useAlertContext, useSelectedDataContext } from '../hooks/useCustomContext';
import { fetchFilteredInquiries } from '../api/message';

const Todos = ({ data, type, deletable }) => {
    const { setSelectedData } = useSelectedDataContext()
    const { alertError, alertWarning } = useAlertContext()

    const handleClick = async (id) => {
        const res = await fetchFilteredInquiries()

        switch (res.code) {
            case 200:
                const inquiryInfo = res.data.find(inquiry => inquiry.inquiryId === id)
                setSelectedData(inquiryInfo);
                break;
            case 400:
                alertError(res.message)
                break;
            default:
                alertWarning(res.message)
        }

    }
    let text = "";
    if (type === "todos") {
        text = `${data.inquiryCode}-${data.inquiryType}-${data.itemName}-${data.customerName}-${data.message}`
    }
    else if (type === "PMMessages") {
        text = data
    }
    else if (type === "PODelay") {
        text = `${data.customerName}-${data.itemName}-${data.salenum}-${data.expectedTime}-延期${data.delayedTime}天`
    }

    return (
        < div className='row todos-wrapper flex-start abnormal g1 flex-between' >
            {/* {type === "todos" ?
                <Link  to='/edit' onClick={() => handleClick(data.inquiryId)}>{text}</Link >: */}
            <div className='row g1 flex-start'>
                {text}
            </div>
            {/* } */}
            <div className='row flex-end g1'>
                {deletable &&
                    < button className='transparent' onClick={() => handleDelete(message.id)}><CloseIcon /></button>
                }
            </div>
        </div >
    )
}

export default Todos;