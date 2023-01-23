import { connect } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostsList from "./PostsList";
import { getTopics } from "../actions/TopicsActions";

const Home = ({loading, topics, getTopics }) => {
    useEffect(() => {
        getTopics();
    }, [getTopics]);
    const navigate = useNavigate();
    const handleChange = (e) => {
        navigate(`/topic/${e.target.value}`)
        e.target.value="";
    }

    return (
        <div>
            <div className='bg-dark-lighter w-full h-10'></div>
            <div className='bg-dark w-full px-40 p-2 flex justify-between items-center'>
                <h1 className='text-gray-200 py-3 text-5xl'>Home</h1>
                {loading ? "loading" : 
                <select className='bg-gray-700 text-gray-300 h-[60px] rounded-md' onChange={handleChange}>
                    <option>Choose topic</option>
                    {topics.map(topic => (
                        <option key={topic._id} value={topic.topic}>{topic.topic}</option>
                    ))}
                </select>
}
            </div>
            <div className='bg-dark-lighter w-full h-10'></div>
            <div className='bg-dark px-40 py-3 h-screen'>
                <PostsList props={{topic: ''}} />
            </div>
        </div>)
};

const mapStateToProps = (state) => ({
    loading: state.loading.topic,
    topics: state.topics,
});

const mapDispatchToProps = {
    getTopics,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);