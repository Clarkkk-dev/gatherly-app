import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the token and any user data
        localStorage.removeItem('token');
        // Redirect to the login page or home
        navigate('/login'); // Adjust to your routes
    };

    return (
        <nav className='flex w-screen justify-around h-[100px] border-b border-gray-300 p-5 '>
            <h1 className='font-pacifico text-[#FF6F00]'>Gatherly</h1>
            <button onClick={handleLogout} className='font-bold'>
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
