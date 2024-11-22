import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/ContextProvider'

const Navbar = ({ setQuery }) => {
    const { user, logout } = useAuth();

    const getInitials = (name) => {
        if (!name) return '';
        const nameParts = name.split(' ');

        if (nameParts.length === 1) {
            return nameParts[0][0].toUpperCase();
        }

        const firstName = nameParts[0][0].toUpperCase();
        const secondName = nameParts[1][0].toUpperCase();;

        return firstName + secondName;
    };

    return (
        <nav className='bg-gray-800 p-5 mb-5 text-white flex justify-between items-center'>
            <div className="font-bold text-xl">
                <Link to='/' className=' hover:text-white text-red-500 text-2xl'>NoteApp</Link>
            </div>
            <input
                type="text"
                placeholder='Search Note...'
                className='border border-red-500 bg-gray-100 px-4 py-4 rounded placeholder-gray-600 text-black hover:bg-gray-300  focus:outline-none'
                onChange={(e) => setQuery(e.target.value)}
            />
            <div>
                {!user
                    ? (
                        <>
                            <Link to='/login' className='bg-blue-500 px-4 py-4 rounded mr-4 hover:opacity-90 hover:text-black'>LogIn</Link>
                            <Link to="/register" className='bg-green-500 px-4 py-4 rounded mr-4 hover:opacity-90 hover:text-black'>SignUp</Link>
                        </>
                    ) : (

                        <>
                            <div className="flex items-center">
                                <span className="mr-4 bg-yellow-300 rounded-full p-3 text-black text-xl cursor-pointer flex justify-center items-center w-12 h-12 hover:text-white hover:bg-yellow-500">
                                    {getInitials(user.name)}
                                </span>
                                <button className="bg-red-500 px-4 py-2 rounded hover:opacity-90 hover:text-black" onClick={logout}>LogOut</button>
                            </div>
                        </>

                    )
                }
            </div>
        </nav>
    )
}

export default Navbar;
