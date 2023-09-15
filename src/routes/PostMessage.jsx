import { useState } from 'react'
import { findMessages, postMessage } from '../api/message'
import { useLoaderData } from 'react-router-dom'
import { useAlertContext } from '../hooks/useCustomContext'
import Message from '../components/Message'

const PostMessage = () => {
    const [value, setValue] = useState("")
    const [messageType, setMessageType] = useState("0")

    const [pastMessages, setPastMessages] = useState(useLoaderData()?.messages ?? [])

    const updateAlert = useAlertContext()

    const handleSubmit = async () => {
        updateAlert({
            type: "SHOW_ALERT", data: {
                type: "confirm", message: "确认发布消息？",
                action: async () => {
                    const res = await postMessage(value, messageType)
                    switch (res.code) {
                        case 200:
                            updateAlert({ type: "SHOW_ALERT", data: { type: "success", message: "发布成功！" } })
                            const res = await findMessages()
                            setPastMessages(res.data)
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
                <button className='rounded blue60' onClick={handleSubmit}>发布</button>
            </div>
            <div className='col post-message-wrapper'>
                <h1>已发布列表</h1>
                <div className='col g1 scroll'>
                    {pastMessages?.map((message) =>
                        <Message message={message} key={message.id} setMessages={setPastMessages} deletable />
                    )}
                </div>
            </div >
        </div >
    )
}

export default PostMessage