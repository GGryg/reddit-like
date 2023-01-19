import { useParams } from "react-router-dom";
import { getPosts } from "../actions/PostsActions";
import { useEffect } from "react";
import { connect } from "react-redux";

const PostDetails = ({getPosts, posts, loading}) => {
    const { id, topic } = useParams();
    useEffect(() => {
        getPosts(topic);
    }, [getPosts, topic]);
    const current = {}

    if(!loading){
        current.post = posts.find((p) => p._id === id);
    }
    console.log(current.post)
    return (
        <div className='bg-dark px-40 py-3 h-screen'>
            {loading ? "loading" : (
                <div>
            <div className='border-gray-600 border-2 my-4 rounded-md w-[70rem] min-h-[15rem] flex'>
                <div className='bg-dark-lighter w-[10rem] flex flex-col justify-center items-center'>
                    <div className='rounded-full w-[115px] h-[115px] bg-slate-200'></div>
                    <div className='text-xl py-3 text-gray-300'>{current.post.user.username}</div>
                </div>
                <div>
                    <div className='bg-dark-lighter w-[60rem] px-4 py-2 text-3xl text-gray-300 font-semibold font-[Helvetica]'>{current.post.title}</div>
                    <div className='p-4 text-gray-300 w-[60rem] break-words'>{current.post.content}</div>
                </div>
            </div>

            <div className='border-gray-600 border-2 rounded-md w-[70rem] p-1 text-gray-300'>commets</div>
            </div>
        )}
        </div>
    )
};

const mapStateToProps = (state) => ({
    loading: state.loading.posts,
    posts: state.posts,
});

const mapDispatchToProps = {
    getPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);