import { useState } from 'react'

const PostMessage = () => {
    const [value, setValue] = useState("")
    const [messageType, setMessageType] = useState("0")
    return (
        <div className='col full-screen post-message-container g2'>
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
                <button className='rounded blue60'>发布</button>
            </div>
            <div className='col post-message-wrapper'>
                <h1>已发布列表</h1>
            </div>
        </div>
    )
}

export default PostMessage