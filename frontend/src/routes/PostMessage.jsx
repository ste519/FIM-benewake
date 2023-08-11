import { useState } from 'react'
import { findMessages, postMessage, updateMessage } from '../api/message'
import { useLoaderData } from 'react-router-dom'
import { useAlertContext } from '../hooks/useCustomContext'
import Message from '../components/Message'

const Popup = ({ msgObj, closePopup, handleSubmit }) => {
    const [value, setValue] = useState(msgObj.message)
    const [messageType, setMessageType] = useState(msgObj.type)

    const handleUpdateSubmit = async () => {
        await handleSubmit("update", value, messageType, msgObj.id)
        closePopup()
    }
    return (
        <div className='popup-container flex-center' >
            <div className='col popup-wrapper post-message-wrapper'>
                <div className='row flex-start g1'>
                    <h1>通知类型：</h1>
                    <label htmlFor="normal1" className='row flex-center'>
                        <input
                            type="radio" id="normal1" value="0"
                            checked={messageType == "0"}
                            onChange={() => setMessageType("0")} />
                        普通通知
                    </label>
                    <label htmlFor="abnormal1" className='row flex-center'>
                        <input
                            type="radio" id="abnormal1" value="1"
                            checked={messageType == "1"}
                            onChange={() => setMessageType("1")} />
                        异常通知
                    </label>
                </div>
                <textarea
                    value={value}
                    onChange={
                        (e) => setValue(e.target.value)} placeholder="请输入文字......"
                />
                <button className='rounded blue60' onClick={handleUpdateSubmit}>发布</button>
            </div>
        </div >
    )
}

const PostMessage = () => {
    const [value, setValue] = useState("")
    const [messageType, setMessageType] = useState("0")
    const [pastMessages, setPastMessages] = useState(useLoaderData() ?? [])
    const [showPopup, setShowPopup] = useState(false)
    const [clickedMessage, setClickedMessage] = useState(null)

    const { alertWarning, alertError, alertSuccess, alertConfirm } = useAlertContext()

    const handleSubmit = async (type, value, messageType, id) => {
        alertConfirm(type === "publish" ? "确认发布消息？" : "确认修改消息并发布？",
            async () => {

                const res = type === "publish"
                    ? await postMessage(value, messageType)
                    : await updateMessage(id, value, messageType)

                switch (res.code) {
                    case 200:
                        alertSuccess("发布成功！")
                        const res = await findMessages()
                        setPastMessages(res.data)
                        break
                    case 400:
                        alertError(res.message)
                        break
                    case 1:
                        alertError(res.message)
                        break
                    default:
                        throw new Error("Unknown inquiry problem")
                }
            }
        )
    }

    const handleMessageClick = (msgObj) => {
        setShowPopup(true)
        setClickedMessage(msgObj)
    }


    return (
        <div className='col full-screen post-message-container g2' >
            <div className='col post-message-wrapper'>
                <div className='row flex-start g1'>
                    <h1>通知类型：</h1>
                    <label htmlFor="normal" className='row flex-center'>
                        <input
                            type="radio" id="normal" value="0"
                            checked={messageType === "0"}
                            onChange={() => setMessageType("0")} />
                        普通通知
                    </label>
                    <label htmlFor="abnormal" className='row flex-center'>
                        <input
                            type="radio" id="abnormal" value="1"
                            checked={messageType === "1"}
                            onChange={() => setMessageType("1")} />
                        异常通知
                    </label>
                </div>
                <textarea
                    value={value}
                    onChange={
                        (e) => setValue(e.target.value)} placeholder="请输入文字......"
                />
                <button className='rounded blue60'
                    onClick={async () => await handleSubmit("publish", value, messageType)}>
                    发布
                </button>
            </div>
            <div className='col post-message-wrapper'>
                <h1>已发布列表</h1>
                <div className='col g1 scroll'>
                    {pastMessages?.map((message) =>
                        <Message
                            message={message}
                            key={message.id}
                            setMessages={setPastMessages}
                            handleMessageClick={() => handleMessageClick(message)}
                            editable />
                    )}
                </div>
            </div >
            {showPopup &&
                <Popup
                    msgObj={clickedMessage}
                    closePopup={() => setShowPopup(false)}
                    handleSubmit={handleSubmit}
                />
            }
        </div >
    )
}

export default PostMessage