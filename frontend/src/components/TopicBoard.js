import Post from './Post';
import PostForm from './PostForm';
import TopicHeader from './TopicHeader';

const TopicBoard = () => {
    return (
        <>
            <TopicHeader />
            <div className='bg-dark px-40 py-3 h-screen'>
                <PostForm />
                <Post />
                <Post />
                <Post />
            </div>
        </>
    )
}

export default TopicBoard;