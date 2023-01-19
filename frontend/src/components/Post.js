import { Link } from "react-router-dom";

const Post = ({props}) => {
    console.log(props);
    return (
        <>
            <Link to={`/topic/${props.topic}/post/${props._id}`}><div className='border-gray-600 border-2 my-4 rounded-md w-256'>
                <h6 className='text-gray-500 text-sm m-1'>Posted by: {props.user.username} in topic: {props.topic}</h6>
                <h2 className='text-gray-200 text-2xl m-1'>{props.title}</h2>
                <div className='text-gray-300 m-1'>{props.content}</div>
            </div></Link>
        </>
    )
};

export default Post;