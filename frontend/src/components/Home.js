import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <div className='bg-dark-lighter w-full h-[7rem]'></div>
            <Link to={`/topic/}`}><div className='bg-dark w-full px-40 p-2'>
                <h1 className='text-cText-light font-semibold text-5xl'>Home</h1>
                <h6 className='text-cText-middle my-1'>Home</h6>
            </div></Link>
        </div>
    )
};

export default Home;