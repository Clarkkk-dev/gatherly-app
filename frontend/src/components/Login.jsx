// src/Login.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { email, password };

        try {
            const response = await axios.post('https://gatherly-app.onrender.com/api/auth/login', userData);
            console.log(response.data);

            // Save token in local storage
            localStorage.setItem('token', response.data.token);

            // Navigate to the dashboard
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
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
                        <h2 className="text-4xl font-bold mb-4">Login</h2>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit">Login</button>
                        </form>
                        <div className="mt-15">
                            <p>Don't have an account yet? <Link to="/Register"><strong>Sign up</strong></Link></p>
                        </div>
                    </div>
                    <div>
                        <img src="/assets/images/Family-cuate.svg" alt="Login Illustration" className='w-[600px]' />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
