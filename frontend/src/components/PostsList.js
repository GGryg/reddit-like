import { useGetPostsQuery, useGetTopicPostsQuery } from "../reducers/postApiSlice"
import Post from "./Post";
import { useParams } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import axios from "axios";

const PostsList = () => {
    useGetPostsQuery();
    const { topic } = useParams();
    const [sort, setSort] = useState('hot');
    const [po, setPo] = useState([]);
    
    const {data: posts, isLoading, isSuccess, isError, error} = useGetTopicPostsQuery(topic);
    let content;

    if(isLoading) content = <div>Loading</div>

    if(isError) content = <div>{error?.data?.message}</div>

    if(isSuccess){
        if(po === []){
        content = posts.map((post) => (
            <Post key={post._id} post={post} />
        ));
        }
        else{
            content = po.map((post) => (
                <Post key={post._id} post={post} />
            ));
        }
    }

    useLayoutEffect(() => {
        let string = '';
        if(sort === 'hot') string += '[upvotes]=-1';
        else if(sort === 'new') string += '[createdAt]=-1';
        if(topic!== 'Home') string += '&filter[topic]=' + topic;

        axios.get(`http://localhost:4000/api/posts?sort${string}`)
            .then((data) => {
                setPo(data.data);
            })
    }, [sort, topic]);

    return (
        <div>
            <div className='bg-dark border-2 p-2 border-dark-lighter w-256 my-4 mx-40 rounded-lg'>
                <button onClick={() => setSort('hot')} className='text-cText-middle font-semibold mx-4 focus:text-cText-light focus:bg-search-default px-4 rounded-2xl'>Hot</button>
                <button onClick={() => setSort('new')} className='text-cText-middle font-semibold mx-4 focus:text-white focus:bg-search-default px-4 rounded-2xl'>New</button>
            </div>
            {content}
        </div>
    )
}

export default PostsList;