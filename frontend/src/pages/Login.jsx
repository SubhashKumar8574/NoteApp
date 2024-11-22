import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';
import { toast } from 'react-toastify';



const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://noteapp-2ys7.onrender.com/api/auth/login', { email, password });
            if (response.data.success) {
                login(response.data.user)
                localStorage.setItem("token", response.data.token);
                toast.success("Logged In Successfully", {
                    autoClose: 1500,
                });
                navigate('/');
            }
            
        } catch (error) {
            if (error.response && error.response.data) {
                // Display the error message from the server
                toast.error(error.response.data.message || 'Login Failed', {
                    autoClose: 1500,
                    theme:'dark',
                    position: "top-center",
                });
            }
            console.log(error);
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-zinc-600/40'>
            <div className='border shadow p-6 w-80 bg-white'>
                <h2 className='text-2xl font-bold mb-4'>Login</h2>
                <form onSubmit={handleSubmit}>

                    <div className='mb-4'>
                        <label className='block text-gray-700' htmlFor="email">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" className='w-full px-3 py-2 border' placeholder='Enter Email' required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700' htmlFor="password">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" className='w-full px-3 py-2 border' placeholder=' Enter ***' required />
                    </div >
                    <div className='mb-4'>
                        <button type='submit' className='w-full bg-teal-600 text-white py-2 mb-2'>Login</button>
                        <p className='text-center'>Don't have Account? <Link className="text-blue-700" to="/register">Register</Link></p>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login