import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://noteapp-2ys7.onrender.com/api/auth/register', { name, email, password });
            if (response.data.success) {
                toast.success('Signed Up Successfully', {
                    autoClose: 1500,
                });
                navigate('/login');
            }

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className=' min-h-screen  bg-zinc-600/40  flex justify-center items-center'>
            <div className='border shadow p-6 w-80 bg-white'>
                <h2 className='text-2xl font-bold mb-4'>SignUp</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700' htmlFor="name">Name</label>
                        <input onChange={(e) => setName(e.target.value)} type="text" className='w-full px-3 py-2 border' placeholder='Enter Name' required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700' htmlFor="email">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" className='w-full px-3 py-2 border' placeholder='Enter Email' required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700' htmlFor="password">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" className='w-full px-3 py-2 border' placeholder=' Enter ***' required />
                    </div >
                    <div className='mb-4'>
                        <button type='submit' className='w-full bg-teal-600 text-white py-2 mb-2' >SignUp</button>
                        <p className='text-center'>Already have Account? <Link className="text-blue-700" to="/login">Login</Link></p>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Signup