import Header from './Header';
import { useParams, Navigate, Outlet, Link } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllTopics } from '../reducers/topicApiSlice';

const Board = () => {
    const topics = useSelector(selectAllTopics)
    const { topic } = useParams();
    const [createPostVisibility, setCreatePostVisibility] = useState(false);

    const findTopic = topics.find((t) => t.name === topic);
    useLayoutEffect(() => {
        if(topic !== 'Home')
            setCreatePostVisibility(true);
    }, [topic]);
    return (
        <>{!findTopic && topic !== 'Home' ? <Navigate to='/t/Home' replace /> :
            <div>
                <Header props={topic} />
                { createPostVisibility ? <Link to={`/t/${topic}/create`}><div className='bg-dark border-2 p-2 border-dark-lighter w-256 my-4 mx-40 rounded-lg text-cText-light text-center'>
                    Click here to create a post!
                </div></Link> : null }
                <Outlet />
                
            </div>}
        </>
    )
}

export default Board;