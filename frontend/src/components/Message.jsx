import React from 'react'
import { ReactComponent as CloseIcon } from '../assets/icons/cross.svg'
import { useAlertContext } from '../hooks/useCustomContext'
import { deleteMessages, findMessages } from '../api/message'

const Message = ({ message, setMessages, deletable }) => {
    const updateAlert = useAlertContext()

    const handleDelete = async (id) => {
        updateAlert({
            type: "SHOW_ALERT", data: {
                type: "confirm", message: "确认删除消息？",
                action: async () => {
                    const res = await deleteMessages([id])
                    switch (res.code) {
                        case 200:
                            updateAlert({ type: "SHOW_ALERT", data: { type: "success", message: "删除成功！" } })
                            const res = await findMessages()
                            setMessages(res.data)
                            break
                        case 400:
                            updateAlert({ type: "SHOW_ALERT", data: { type: "error", message: res.message } })
                            break
                        case 1:
                            updateAlert({ type: "SHOW_ALERT", data: { type: "error", message: res.message } })
                            break
                        default:
                            throw new Error("Unknown inquiry problem")
                    }
                }
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