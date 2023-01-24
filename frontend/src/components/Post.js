import { useSelector } from "react-redux";
import { useGetPostsQuery } from "../reducers/postApiSlice";
import Author from './Author';
import moment from 'moment';
import { BiDownvote, BiUpvote } from 'react-icons/bi'
import { Link } from "react-router-dom";
import { RiDeleteBinFill } from 'react-icons/ri'
import axios from "axios";
import { selectCurrentUser } from "../reducers/authSlice";

const Post = ({ post }) => {
    useGetPostsQuery();
    const auth = useSelector(selectCurrentUser);
    const check = auth.user.id === post.user || auth.user.role === 'admin' || auth.user.role === 'moderator';
    const handleDelete = async () => {
        try{
            await axios.delete(`http://localhost:4000/api/posts/${post._id}`, {withCredentials: true});
        }
        catch(err){
            console.error(err);
        }
    };
    
    //const post = useSelector(state => selectPostsById(state, postId));
    const timeago = moment(post.createdAt).fromNow();
    return (<div> 
        <Link to={`/t/${post.topic}/post/${post._id}`}><div className="flex bg-dark border-2 p-2 border-dark-lighter w-256 my-4 mx-40 rounded-lg">
            <div className="text-cText-light p-1 font-semibold flex flex-col items-center justify-center">
                <BiUpvote className='h-5 w-5'/>
                {post.upvotes}
                <BiDownvote className="h-5 w-5" />
            </div>
            <div className="mx-4 w-[100%]">
                <div className='flex text-cText-middle text-sm items-center gap-2'><Author userId={post.user} /> {timeago}</div>
                <div className='flex justify-between w-[100%]'><h2 className="text-cText-light font-semibold text-2xl break-words">{post.title}</h2>
                    {check ? <div className='flex gap-2'>
                            <RiDeleteBinFill onClick={() => handleDelete()} className='w-6 h-6 text-red-600'/>
                    </div> : null}
                </div>
                <div className="text-cText-light break-words">
                    {post.content}
                </div>
            </div>
        </div></Link>
    </div>)
};

export default Post;