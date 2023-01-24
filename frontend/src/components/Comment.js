import { useSelector } from "react-redux";
import Author from './Author';
import moment from 'moment';
import { BiDownvote, BiUpvote } from 'react-icons/bi'
import { selectCommentById } from "../reducers/commentsApiSlice";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { selectCurrentUser } from "../reducers/authSlice";
import { RiEdit2Fill, RiDeleteBinFill } from 'react-icons/ri'


const Comment = ({ commentId }) => {
    const auth = useSelector(selectCurrentUser);
    const handleDelete = async () => {
        try{
            await axios.delete(`http://localhost:4000/api/comments/${commentId}`, {withCredentials: true});
        }
        catch(err){
            console.error(err);
        }
        
    };
    
    const comment = useSelector(state => selectCommentById(state, commentId));
    if(comment){
    const check = auth.user.id === comment.user || auth.user.role === 'admin' || auth.user.role === 'moderator';

    const timeago = moment(comment.createdAt).fromNow();
    return (<div> 
        <div className="flex bg-dark border-2 p-2 border-dark-lighter w-[60rem] mx-4 my-4 rounded-lg">
            <div className="text-cText-light p-1 font-semibold flex flex-col items-center justify-center">
                <BiUpvote className='h-5 w-5'/>
                {comment.upvotes}
                <BiDownvote className="h-5 w-5" />
            </div>
            <div className="mx-4 w-[100%]">
                <div className='flex justify-between w-[100%]'>
                <div className="text-cText-middle text-sm flex items-center gap-2"><Author userId={comment.user} /> {timeago}</div>
                {check ? <div className='flex gap-2'>
                            <Link to='edit'><RiEdit2Fill className='w-6 h-6 text-icon-purple'/></Link>
                            <RiDeleteBinFill onClick={() => handleDelete()} className='w-6 h-6 text-red-600'/>
                        </div> : null}</div>
                <div className="text-cText-light break-words text-lg">
                    {comment.content}
                </div>
                {comment.links ? <div className="border-[1px] text-center text-cText-light border-dark-lighter">Click <a href={comment.links}>Link</a></div> : null }
            </div>
        </div>
    </div>)}else
        return <div> loading</div>
};

export default Comment;