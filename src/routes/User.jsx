
import { useLoaderData } from 'react-router-dom';
import Message from '../components/Message';
import { useState } from 'react';

export default function User() {
    const [messages, setMessages] = useState(useLoaderData() ?? [])
    return (
        <div className='user-container full-screen'>
            <div className='user-feature'>
                <h1>常用功能</h1>
            </div>
            <div className='user-feature'>
                <h1>待办任务</h1>
            </div>
            <div className='user-feature'>
                <h1>异常同步</h1>
                <div className='col g1 mt1'>
                    {messages?.map((message) =>
                        <Message message={message} key={message.id} setMessages={setMessages}/>
                    )}
                </div>
            </div>
            <div className='user-feature'>
                <h1>待处理监控消息</h1>
            </div>
        </div>
    )
}
