import React from 'react'
import { ReactComponent as CloseIcon } from '../assets/icons/cross.svg'
import { ReactComponent as VisibilityOnIcon } from '../assets/icons/visibility-on.svg'
import { ReactComponent as VisibilityOffIcon } from '../assets/icons/visibility-off.svg'
import { useAlertContext } from '../hooks/useCustomContext'
import { deleteMessages, findMessages, hideMessage } from '../api/message'
import moment from 'moment'

const Message = ({ message, setMessages, editable }) => {
    const { alertSuccess, alertError, alertConfirm } = useAlertContext()

    const handleDelete = async (id) => {
        alertConfirm("确认删除消息？",
            async () => {
                const res = await deleteMessages([id])
                switch (res.code) {
                    case 200:
                        alertSuccess("删除成功！")
                        const res = await findMessages()
                        setMessages(res.data)
                        break
                    case 400:
                    case 1:
                        alertError(res.message)
                        break
                    default:
                        alertError("未知错误")
                        break
                }
            })
    }

    const handleHidden = async (id) => {
        await hideMessage(id)
        const res = await findMessages()
        setMessages(res.data)
    }

    return (
        < div key={message.id} className={`row message-wrapper flex-start ${message?.type == "1" ? 'abnormal' : 'normal'} g1 flex-between ${message.is_hiden && 'faded'}`} >
            <div className='col'>
                <h6>{moment(message.update_time).format('YYYY/MM/DD')}</h6>
                <p>{message.message}</p>
            </div>
            <div className='row flex-end g1'>
                <h1>{message?.type == "1" ? '异常' : '普通'}</h1>
                {editable &&
                    <div className='col'>
                        <button className='transparent' onClick={() => handleDelete(message.id)}><CloseIcon /></button>
                        <button className='transparent' onClick={() => handleHidden(message.id)}>{message.is_hiden ? <VisibilityOnIcon className="md" /> : <VisibilityOffIcon className="md" />}</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Message