import axios from "axios";
import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = ({props}) => {
    const [loading, setLoading] = useState(true);
    const [topics, setTopics] = useState([]);

    useLayoutEffect(() => {
        axios.get('http://localhost:4000/api/topics')
            .then((res) => {
                setTopics(res.data)
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [])

    if(loading) return <div>Loading</div>

    const topic = topics.find(t => t.name === props);
    return (
    <>
        <div>
            <div className='bg-dark-lighter w-full h-[7rem]'></div>
            <Link to={`/t/${props}`}><div className='bg-dark w-full px-40 p-2 flex items-end'>
                <img src={`http://localhost:4000/${ topic ? topic.picture : '/topics/home.png'}`} alt="Topic" className="rounded-full w-[10rem] h-p[10rem] absolute" />
                <div className="relative left-[170px]">
                <h1 className='text-cText-light font-semibold text-5xl'>{props}</h1>
                <h6 className='text-cText-middle my-1'>{props === 'Home' ? props : topic.description ? topic.description : "No description"}</h6>
                </div>
            </div></Link>
        </div>
    </>)
};

export default Header;