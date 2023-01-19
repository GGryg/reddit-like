import { connect } from "react-redux";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { getPosts } from "../actions/PostsActions";
import Post from './Post';

const PostsList = ({props ,getPosts, posts, loading}) => {
    const [t] = useOutletContext() || [props.topic];

    useEffect(() => {
        getPosts(t);
      }, [getPosts, t]);
    
    return <div>{ loading ? "loading" : posts.map(post => (
        <Post key={post._id} props={post} />
    ))}</div>
};

const mapStateToProps = (state) => ({
    posts: state.posts,
    loading: state.loading.posts,
});

const mapDispatchToProps = {
    getPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);