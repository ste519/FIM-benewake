
import { useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
import Message from '../components/Message';
import { useState } from 'react';
import Todos from '../components/Todos';
import { Suspense } from 'react';
import { Await } from 'react-router-dom';
import Loader from '../components/Loader';
import { findMessages, findPODelay, findTodos } from '../api/message';

export default function User() {
    const [messages, setMessages] = useState();
    const [todosNMessages, setTodosNMessages] = useState();
    const [PODelay, setPODelay] = useState();
    const [loading, setLoading] = useState(true);

    function isValid(data) {
        return data && Array.isArray(data);
    }

    useEffect(() => {
        const abortController = new AbortController();
        const { signal } = abortController;

        async function fetchData() {
            try {
                setLoading(true);

                const messagesData = await findMessages({ signal });
                setMessages(messagesData);


                const todosNMessagesData = await findTodos({ signal });
                setTodosNMessages(todosNMessagesData);

                const PODelayData = await findPODelay({ signal });
                setPODelay(PODelayData);

                setLoading(false);
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Request canceled:', err.message);
                } else {
                    console.error("Error occurred:", err);
                }
                setLoading(false)
            }
        }

        fetchData();

        return () => {
            abortController.abort();
        };
    }, []);


    if (loading) {
        return <Loader />;
    }

    return (
        <div className='user-container full-screen'>
            <div className='user-feature'>
                <h1>异常同步</h1>
                <div className='col g1 mt1'>
                    {isValid(messages?.data) && messages.data.map((message, i) =>
                        <Message message={message} key={i} />
                    )}
                </div>
            </div>
            <div className='user-feature'>
                <h1>待办任务</h1>
                <div className='col g1 mt1'>
                    {isValid(todosNMessages?.data) && todosNMessages.data.map((todo, i) =>
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
                    {isValid(todosNMessages?.message) &&
                        <Todos data={todosNMessages.message} type="PMMessages" />}

                    {isValid(PODelay?.data) && PODelay.data.map((data, i) =>
                        <Todos data={data} type="PODelay" key={i} />
                    )}
                </div>
            </div>
        </div>
    );
}

