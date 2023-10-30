import React from 'react'
import { ReactComponent as CloseIcon } from '../assets/icons/cross.svg'
import { useAlertContext } from '../hooks/useCustomContext'
import { deleteMessages, findMessages } from '../api/message'

const Message = ({ message, setMessages, deletable }) => {
    const { alertSuccess, alertError, alertWarning, alertConfirm } = useAlertContext()

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

    return (
        <>
            {message?.type == "1"
                ? < div key={message.id} className='row message-wrapper flex-start abnormal g1 flex-between' >
                    <div className='row g1 flex-start'>
                        {message.message}
                    </div>
                    <div className='row flex-end g1'>
                        <h1>异常</h1>
                        {deletable &&
                            < button className='transparent' onClick={() => handleDelete(message.id)}><CloseIcon /></button>
                        }
                    </div>
                </div>
                :
                < div key={message.id} className='row message-wrapper normal g1 flex-between'>
                    <div className='row g1 flex-start'>
                        {message.message}
                    </div>
                    <div className='row flex-end g1'>
                        <h1>普通</h1>
                        {deletable &&
                            <button className='transparent ' onClick={() => handleDelete(message.id)}><CloseIcon /></button>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Message