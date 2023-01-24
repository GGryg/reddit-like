import { useGetCommentsQuery, useGetPostCommentQuery } from "../reducers/commentsApiSlice";
import Comment from './Comment';

const CommentsList = ({props}) => {
    useGetCommentsQuery();
    
    const {data: comments, isLoading, isSuccess, isError, error} = useGetPostCommentQuery(props);
    let content;

    if(isLoading) content = <div>Loading</div>

    if(isError) content = <div>{error?.data?.message}</div>

    if(isSuccess){
        const { ids } = comments;
        content = ids.map((id) => (
            <Comment key={id} commentId={id} />
        ));
    }

    return (
        <div>
            <div className='bg-dark border-2 p-2 border-dark-lighter w-[60rem] mx-4 my-4 rounded-lg'>
                <button className='text-cText-middle font-semibold mx-4 focus:text-cText-light focus:bg-search-default px-4 rounded-2xl'>Hot</button>
                <button className='text-cText-middle font-semibold mx-4 focus:text-white focus:bg-search-default px-4 rounded-2xl'>New</button>
            </div>
            {content}
        </div>
    )
}

export default CommentsList;