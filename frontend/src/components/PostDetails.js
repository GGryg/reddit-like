import moment from 'moment';
import { BiDownvote, BiUpvote } from 'react-icons/bi'
import { RiEdit2Fill, RiDeleteBinFill } from 'react-icons/ri'
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";
import { useGetPostQuery } from '../reducers/postApiSlice';
import Author from './Author';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { selectCurrentUser } from "../reducers/authSlice";
import { useSelector } from 'react-redux';

const PostDetails = () => {
    const { postId, topic } = useParams();
    const {data: posts, isLoading}= useGetPostQuery(postId);

    const navigate = useNavigate();
    const auth = useSelector(selectCurrentUser);
    const handleDelete = () => {
        axios.delete(`http://localhost:4000/api/posts/${postId}`, {withCredentials: true});
        navigate(`/t/${topic}`)
    };
    
    if(!isLoading){
        if(!posts) return <div>Deleted</div>

        const check = auth.user.id === posts.user || auth.user.role === 'admin' || auth.user.role === 'moderator';
        const timeago = moment(posts.createdAt).fromNow();
        return (
            <div className="bg-dark border-2 p-2 border-dark-lighter w-256 my-4 mx-40 rounded-lg">
                <div className="flex">
                <div className="text-cText-light p-1 font-semibold flex flex-col items-center justify-center">
                    <BiUpvote className='h-5 w-5'/>
                    {posts.upvotes}
                    <BiDownvote className="h-5 w-5" />
                </div>
                <div className="mx-4 w-[100%]">
                    <div className='flex text-cText-middle text-sm items-center gap-2'><Author userId={posts.user} /> {timeago}</div>
                    <div className='flex justify-between w-[100%]'><h2 className="text-cText-light font-semibold text-2xl break-words">{posts.title}</h2>
                        {check ? <div className='flex gap-2'>
                            <Link to='edit'><RiEdit2Fill className='w-6 h-6 text-icon-purple'/></Link>
                            <RiDeleteBinFill onClick={() => handleDelete()} className='w-6 h-6 text-red-600'/>
                        </div> : null}
                    </div>
                    <div className="text-cText-light break-words text-lg">
                        {posts.content}
                    </div>
                    <div>
                        {posts?.picture ? <img src={`http://localhost:4000/${posts.picture}`} alt="user" /> : null }
                    </div>
                    <div>
                        {posts?.links ? <a href={posts.links}>Link</a> : null }
                    </div>
                </div>
                </div>
                <Outlet />
                <CommentForm />
                <CommentsList props={postId} />
            </div>
    )}
    else
        return <div>Loading</div>;
};

export default (PostDetails);