
import { useLoaderData } from 'react-router-dom';
import Message from '../components/Message';
import { useState } from 'react';
import Todos from '../components/Todos';

export default function User() {
    const [messages, setMessages] = useState(useLoaderData().messages ?? [])
    const todos = useLoaderData()?.todos ?? []
    const PMMessages = useLoaderData()?.PMMessages ?? []
    const PODelay = useLoaderData()?.PODelay ?? []

    function isValid(data) {
        return data && Array.isArray(data)
    }

    return (
        <div className='user-container full-screen'>
            <div className='user-feature'>
                <h1>异常同步</h1>
                <div className='col g1 mt1'>
                    {isValid(messages) &&
                        messages?.map((message, i) =>
                            <Message message={message} key={i} setMessages={setMessages} />
                        )}
                </div>
            </div>
            <div className='user-feature'>
                <h1>待办任务</h1>
                <div className='col g1 mt1'>

                    {isValid(todos) &&
                        todos.map((todo, i) =>
                            <Todos data={todo} type="todos" key={i} />
                        )}
                </div>
            </div>
            <div className='user-feature'>
                <h1>常用功能</h1>
            </div>
            <div className='user-feature'>
                <h1>待处理监控消息</h1>
                <div className='col g1 mt1'>
                    {isValid(PMMessages) &&
                        PMMessages?.map((data, i) =>
                            <Todos data={data} type="PMMessages" key={i} />
                        )}
                    {isValid(PODelay) &&
                        PODelay?.map((data, i) =>
                            <Todos data={data} type="PODelay" key={i} />
                        )}
                </div>
            </div>
        </div>
    )
}
