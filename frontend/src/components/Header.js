import Logo from './../logo.png';
import { TfiSearch } from 'react-icons/tfi';
import { BsChatDots } from 'react-icons/bs'
import { IoNotificationsOutline, IoAddCircleOutline } from 'react-icons/io5'
import { MdOutlineManageAccounts } from 'react-icons/md'

const Header = () => {
    const isLogged = false;

    return (
    <header className="bg-dark w-full p-3 flex justify-between">
        <div className='mx-4'>
            <img src={Logo} alt="logo" className='w-8 h-8'></img>
        </div>
        <form action='' className='bg-gray-700 p-1 h-8 rounded-lg flex'>
            <TfiSearch className='text-gray-300 h-6 w-6'/>
            <input type='text' className='bg-gray-700 h-6 w-128 p-2 focus:outline-none text-white' placeholder='search' />
        </form>
        { isLogged ? (<div>
            <button className='mx-4'>
                <BsChatDots className='text-gray-300 h-6 w-6'/>
            </button>
            <button className='mx-4'>
                <IoNotificationsOutline className='text-gray-300 h-7 w-6'/>
            </button>
            <button className='mx-4 '>
                <IoAddCircleOutline className='text-gray-300 h-7 w-7' />
            </button>
            <button className='mx-4 justify-end'>
                <MdOutlineManageAccounts className='text-gray-300 h-7 w-7' />
            </button>
        </div>) : (
                <div>
                    <button className='py-1 px-3 text-gray-300 bg-gray-700 rounded-lg'>Log In</button>
                    <button className='py-1 px-3 text-gray-300 mx-7 bg-gray-700 rounded-lg'>Sign Up</button>
                </div>
        )}
  </header>
  )
}

export default Header;