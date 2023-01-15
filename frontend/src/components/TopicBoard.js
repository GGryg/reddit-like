import { connect } from 'react-redux';
import PostForm from './PostForm';
import PostsList from './PostsList';
import TopicHeader from './TopicHeader';
import { useParams } from 'react-router-dom';
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
            <div>
                <TopicHeader props={current.topic} />
                <div className='bg-dark px-40 py-3 h-screen'>
                    <PostForm />
                    <PostsList />
                </div>
            </div>
        )}
            
        </>
    )
}

const mapStateToProps = (state) => ({
    loading: state.loading,
    topics: state.topics,
});

const mapDispatchToProps = {
    getTopics,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicBoard);