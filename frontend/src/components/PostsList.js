import { connect } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "../actions/PostsActions";
import Post from './Post';

const PostsList = ({props ,getPosts, posts}) => {
    useEffect(() => {
        getPosts(props.topic);
      }, [getPosts]);
    
    return <div>{posts.map(post => (
        <Post key={post._id} props={post} />
    ))}</div>
};

const mapStateToProps = (state) => ({
    posts: state.posts
});

const mapDispatchToProps = {
    getPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);