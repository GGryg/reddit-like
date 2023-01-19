import { connect } from 'react-redux';
import PostForm from './PostForm';
import PostsList from './PostsList';
import TopicHeader from './TopicHeader';
import { useParams, Navigate } from 'react-router-dom';
import { getTopics } from './../actions/TopicsActions';
import { useEffect } from 'react';

const TopicBoard = ({loading, topics, getTopics}) => {
    const {topic} = useParams();
    useEffect(() => {
        getTopics();
    }, [getTopics]);

    const current = {}

    if(!loading){
        current.topic = topics.find((t) => t.topic === topic);
    }
    
    return (
        <>{loading ? <div>loading</div> : (
            !current.topic ? <Navigate to='/' replace={true} /> :
            <div>
                <TopicHeader props={current.topic} />
                <div className='bg-dark px-40 py-3 h-screen'>
                    <PostForm />
                    <PostsList props={current.topic} />
                </div>
            </div>
        )}
            
        </>
    )
}

const mapStateToProps = (state) => ({
    loading: state.loading.topic,
    topics: state.topics,
});

const mapDispatchToProps = {
    getTopics,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicBoard);