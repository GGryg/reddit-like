const TopicHeader = ({props}) => {
    return (
    <>
        <div className='bg-dark-lighter w-full h-10'></div>
        <div className='bg-dark w-full px-40 p-2'>
            <h1 className='text-gray-200 text-5xl'>{props.topic}</h1>
            <h6 className='text-gray-400 my-2'>{props.desc}</h6>
        </div>
    </>)
};

export default TopicHeader;