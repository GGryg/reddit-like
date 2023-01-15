import Logo from './../logo.png';
import { TfiSearch } from 'react-icons/tfi';
import { BsChatDots } from 'react-icons/bs'
import { IoNotificationsOutline, IoAddCircleOutline } from 'react-icons/io5'
import { MdOutlineManageAccounts } from 'react-icons/md'
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import UseOnClickOutside from '../hooks/UseOnClickOutside';
import { connect } from 'react-redux';

import { logoutUser } from './../actions/UsersActions';

const Header = ({logoutUser, auth}) => {
    const { isAuthenticated, user } = auth;

    const ref = useRef();
    const [dropDown, setDropDown] = useState(false);

    UseOnClickOutside(ref, () => setDropDown(false));

    return (
    <header className="bg-dark w-full p-3 flex justify-between">
        <div className='mx-4'>
            <img src={Logo} alt="logo" className='w-8 h-8'></img>
        </div>
        <form action='' className='bg-gray-700 p-1 h-8 rounded-lg flex'>
            <TfiSearch className='text-gray-300 h-6 w-6'/>
            <input type='text' className='bg-gray-700 h-6 w-128 p-2 focus:outline-none text-white' placeholder='search' />
        </form>
        { isAuthenticated ? (<div>
            <button className='mx-4'>
                <BsChatDots className='text-gray-300 h-6 w-6'/>
            </button>
            <button className='mx-4'>
                <IoNotificationsOutline className='text-gray-300 h-7 w-6'/>
            </button>
            <button className='mx-4 '>
                <IoAddCircleOutline className='text-gray-300 h-7 w-7' />
            </button>
            <button onClick={() => setDropDown(!dropDown)} className='mx-4 justify-end'>
                <MdOutlineManageAccounts className='text-gray-300 h-7 w-7' />
            </button>
            {dropDown ? (<div className={"absolute w-20 right-7 top-10 bg-dark border border-gray-700 z-10 rounded-md text-gray-300 overflow-hidden "+dropDown}>
                <button className='text-gray-300 block flex w-50 py-2 px-3 hover:bg-gray-300 hover:text-black'>Settings</button>
                <button onClick={() => logoutUser()} className='text-gray-300 w-full block flex w-50 py-2 px-3 hover:bg-gray-300 hover:text-black'>Logout</button> </div>) : null}

        </div>) : (
                <div>
                    <Link to='/login'><button className='py-1 px-3 text-gray-300 bg-gray-700 rounded-lg'>Log In</button></Link>
                    <Link to='/register'><button className='py-1 px-3 text-gray-300 mx-7 bg-gray-700 rounded-lg'>Register</button></Link>
                </div>
        )}
  </header>
  )
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    auth: state.auth,
});

const mapDispatchToProps = {
    logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);