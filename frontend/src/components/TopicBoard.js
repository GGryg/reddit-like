import PostForm from './PostForm';
import PostsList from './PostsList';
import TopicHeader from './TopicHeader';

const TopicBoard = () => {
    return (
        <>
            <TopicHeader />
            <div className='bg-dark px-40 py-3 h-screen'>
                <PostForm />
                <PostsList />
            </div>
        </>
    )
}

export default TopicBoard;