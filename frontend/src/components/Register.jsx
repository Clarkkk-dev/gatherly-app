// src/components/Register.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        setIsRegistering(true);
        setErrorMessage('');

        try {
            // Register the user
            const registerResponse = await axios.post('https://gatherly-app.onrender.com/api/auth/register', {
                full_name: fullName,
                email,
                password,
            });

            // If registration is successful, log in the user
            const loginResponse = await axios.post('https://gatherly-app.onrender.com/api/auth/login', {
                email,
                password,
            });

            // Store the token in localStorage
            localStorage.setItem('token', loginResponse.data.token);
            console.log(localStorage.getItem('token'));

            // Redirect to the introductory page
            navigate('/intro');

        } catch (error) {
            setMessage(error.response?.data?.message || 'Server error');
        } finally {
            setIsRegistering(false);
        }
    };

    return (
        <section>
            <div className="row">
                <div className="flex">
                    <div className="formArea">
                        <h1 className="logoText">
                            <Link to="/">Gatherly</Link>
                        </h1>

                        <h2 className="text-4xl font-bold mb-4">Signup</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                 {/* <label>Name:</label> */}
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder='Name'
                                    required
                                />
                            </div>
                            <div>
                                {/* <label>Email:</label> */}
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Email'
                                    required
                                />
                            </div>
                            <div>
                                {/* <label>Password:</label> */}
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                      placeholder='Password'
                                    required
                                />
                            </div>
                            <div>
                                {/* <label className="text-sm text-gray-600 font-bold">Confirm Password</label> */}
                                <input
                                    disabled={isRegistering}
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder=' Confirm Password'
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                                />
                            </div>
                            {errorMessage && (
                                <span className='text-red-600 font-bold'>{errorMessage}</span>
                            )}
                            <button type="submit" disabled={isRegistering}>
                                {isRegistering ? 'Registering...' : 'Register'}
                            </button>
                        </form>
                        {message && <p>{message}</p>}
                        <div className="mt-15">
                            <p>Already have an account? <Link to="/login"><strong>Login</strong></Link></p>
                        </div>
                    </div>
                    <div>
                        <img src="/assets/images/Group discussion-cuate.svg" alt="Login Illustration" className="w-[600px]"/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
