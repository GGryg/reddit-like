import { connect } from 'react-redux';
import PostForm from './PostForm';
import PostsList from './PostsList';
import TopicHeader from './TopicHeader';
import { useParams } from 'react-router-dom';
import {getTopics} from './../actions/TopicsActions';
import { useEffect } from 'react';

const TopicBoard = ({topics, getTopics}) => {
    const {topic} = useParams();
    useEffect(() => {
        getTopics();
    }, [getTopics]);

    const currentTopic = topics.find((t) => t.topic === topic);

    return (
        <>
            <TopicHeader props={currentTopic} />
            <div className='bg-dark px-40 py-3 h-screen'>
                <PostForm />
                <PostsList />
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    topics: state.topics
});

const mapDispatchToProps = {
    getTopics
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicBoard);