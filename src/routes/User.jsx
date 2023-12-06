
import { useLoaderData } from 'react-router-dom';
import Message from '../components/Message';
import { useState } from 'react';
import Todos from '../components/Todos';
import { Suspense } from 'react';
import { Await } from 'react-router-dom';
import Loader from '../components/Loader';

export default function User() {
    const { messages, todosNMessages, PODelay } = useLoaderData();

    function isValid(data) {
        return data && Array.isArray(data);
    }

    return (
        <div className='user-container full-screen'>
            <div className='user-feature'>
                <h1>异常同步</h1>
                <div className='col g1 mt1'>
                    {isValid(messages.data) && messages.data.map((message, i) =>
                        <Message message={message} key={i} />
                    )}
                </div>
            </div>
            <div className='user-feature'>
                <h1>待办任务</h1>
                <div className='col g1 mt1'>
                    {isValid(todosNMessages.data) && todosNMessages.data.map((todo, i) =>
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
                    {todosNMessages.message &&
                        <Todos data={todosNMessages.message} type="PMMessages" />}

                    {isValid(PODelay.data) && PODelay.data.map((data, i) =>
                        <Todos data={data} type="PODelay" key={i} />
                    )}
                </div>
            </div>
        </div>
    );
}

