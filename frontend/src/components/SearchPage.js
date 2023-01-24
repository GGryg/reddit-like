import { useEffect, useState } from "react";
import axios from 'axios';
import Post from './Post';
import { useParams } from "react-router-dom";

const SearchPage = () => {
    const { text } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:4000/api/posts/p/search?search=${text}`)
            .then(res => {
                setPosts(res.data);
                setLoading(false);
            }) ;
    }, [text]);

    if(loading) return <div>Loading</div>
    console.log(posts);
    return <div>{posts.map((post) => (
        <Post key={post._id} post={post} />
    ))}</div>
};

export default SearchPage;