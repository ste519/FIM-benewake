import { useState } from 'react'
import { ReactComponent as CloseIcon } from '../assets/icons/cross.svg'
import { ReactComponent as EditIcon } from '../assets/icons/menu.svg'
import { useAlertContext } from '../hooks/useCustomContext'
import { deleteMessages, findMessages, updateMessage } from '../api/message'
import moment from 'moment'


const Message = ({ message, setMessages, editable, handleMessageClick }) => {
    const updateAlert = useAlertContext()

    const handleDelete = async () => {
        updateAlert({
            type: "SHOW_ALERT", data: {
                type: "confirm", message: "确认删除消息？",
                action: async () => {
                    const res = await deleteMessages([message.id])
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

    const handleEdit = async () => {
        const res = await updateMessage(message.id, message.message, message.type)
        switch (res.code) {
            case 200:
                updateAlert({ type: "SHOW_ALERT", data: { type: "success", message: "修改成功！" } })
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

    return (
        <>
            < div key={message.id} className={`row message-wrapper flex-start ${message?.type == "1" ? "abnormal" : "normal"} g1 flex-between`} >
                <div className='row g1 flex-start'>
                    {message.message}
                </div>
                <div className='row flex-end g1'>
                    <h1>{moment(message.update_time).format("YYYY/MM/DD HH:mm")}</h1>
                    {editable &&
                        <div className='row flex-center'>
                            < button className='transparent' onClick={handleMessageClick}><EditIcon /></button>
                            < button className='transparent' onClick={handleDelete}><CloseIcon /></button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Message