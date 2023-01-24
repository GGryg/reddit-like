import Logo from './../logo.png';
import { TfiSearch } from 'react-icons/tfi';
import { BsChatDots } from 'react-icons/bs'
import { IoNotificationsOutline, IoAddCircleOutline } from 'react-icons/io5'
import { MdOutlineManageAccounts } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import UseOnClickOutside from '../hooks/UseOnClickOutside';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTopics, useGetTopicsQuery } from '../reducers/topicApiSlice';
import { selectCurrentUser } from '../reducers/authSlice';
import { useLogoutMutation } from '../reducers/authApiSlice';


const Navbar = () => {
    const auth = useSelector(selectCurrentUser);
    const isAuthenticated = auth.isAuthenticated || false;

    const ref = useRef();
    const dispatch = useDispatch();
    const [dropDown, setDropDown] = useState(false);

    const { isFetching } = useGetTopicsQuery();
    const [ logout ] = useLogoutMutation();

    UseOnClickOutside(ref, () => setDropDown(false));

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logout());
    };

    const navigate = useNavigate();
    const handleChange = (e) => {
        navigate(`/t/${e.target.value}`);
    }

    const top = useSelector(selectAllTopics);

    const [search, setSearch] = useState('');

    const searchRedirect = (e) => {
        e.preventDefault();
        navigate(`/search/${search}`);
    }

    return <header className="bg-dark w-full p-3 flex justify-between">
        <Link to='/'><div className='mx-4 flex items-center'>
            <img src={Logo} alt="logo" className='w-8 h-8'></img>
            <h1 className='text-gray-300 text-xl mx-3'>Home</h1>
        </div></Link>
        {isFetching ? "Loading" : (
            <select onChange={handleChange} className='bg-dark text-cText-light rounded px-3 hover:border-[1px] hover:border-search'>
                <option disabled="disabled">Choose topic</option>
                <option>Home</option>
                
                {top.map((topic) => (
                    <option key={topic.id} value={topic.name} >{topic.name}</option>
                ))}
                
            </select>
        )}
        <form onSubmit={searchRedirect} className='bg-search-default p-3 h-8 rounded-2xl flex items-center'>
            <TfiSearch className='text-cText-middle h-5 w-5'/>
            <input type='text' className='bg-search-default h-6 w-128 p-2 focus:outline-none text-white' onChange={e => setSearch(e.target.value)} placeholder='search' />
        </form>
        { isAuthenticated ? (<div>
            <button className='mx-4'>
                <BsChatDots className='text-gray-300 h-6 w-6'/>
            </button>
            <button className='mx-4'>
                <IoNotificationsOutline className='text-gray-300 h-7 w-6'/>
            </button>
            {auth.user.role === 'admin' ? <Link to='/topic/create'><button className='mx-4 '>
                <IoAddCircleOutline className='text-gray-300 h-7 w-7' />
            </button></Link> : null}
            <button onClick={() => setDropDown(!dropDown)} className='mx-4 justify-end'>
                <MdOutlineManageAccounts className='text-gray-300 h-7 w-7' />
            </button>
            {dropDown ? (<div className={"absolute w-20 right-7 top-10 bg-dark border border-gray-700 z-10 rounded-md text-gray-300 overflow-hidden "+dropDown}>
                <Link to='/settings'><button className='text-gray-300 flex w-50 py-2 px-3 hover:bg-gray-300 hover:text-black'>Settings</button></Link>
                <button onClick={() => handleLogout()} className='text-gray-300 w-full flex w-50 py-2 px-3 hover:bg-gray-300 hover:text-black'>Logout</button> </div>) : null}

        </div>) : (
                <div>
                    <Link to='/login'><button className='py-1 px-4 text-cText-gray font-semibold bg-button-light rounded-2xl'>Log In</button></Link>
                    <Link to='/register'><button className='py-1 px-4 text-white font-semibold mx-7 bg-button-orange rounded-2xl'>Register</button></Link>
                </div>
        )}
    </header>
}

export default Navbar;