import PostsList from "./PostsList";

const Home = () => {
    return (
        <div>
            <div className='bg-dark-lighter w-full h-10'></div>
            <div className='bg-dark w-full px-40 p-2'>
                <h1 className='text-gray-200 text-5xl'>Home</h1>
            </div>
            <div className='bg-dark px-40 py-3 h-screen'>
                <PostsList props={{topic: ''}} />
            </div>
        </div>)
};

export default Home;