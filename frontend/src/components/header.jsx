import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    // const navigate = useNavigate();
    // const location = useLocation();
    // const [familyGroup, setFamilyGroup] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const userName = localStorage.getItem('name') || 'Guest';

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         setIsLoggedIn(true);
    //         const fetchFamilyGroup = async () => {
    //             try {
    //                 const response = await axios.get('http://localhost:3000/api/family-group/mine', {
    //                     headers: {
    //                         'Authorization': `Bearer ${token}`,
    //                     },
    //                 });
    //                 setFamilyGroup(response.data.familyGroup);
    //                 console.log('Fetched family group:', response.data.familyGroup);
    //             } catch (error) {
    //                 console.error('Error fetching family group:', error);
    //             } finally {
    //                 setLoading(false);
    //             }
    //         };
    //         fetchFamilyGroup();
    //     } else {
    //         setIsLoggedIn(false);
    //         setLoading(false);
    //     }
    // }, [navigate]); // Only run on mount

    // const handleLogout = () => {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('name');
    //     setIsLoggedIn(false);
    //     navigate('/login');
    // };

    // if (loading) {
    //     return <p>Loading...</p>;
    // }

    // if (!isLoggedIn) {
    //     return null;
    // }

    // return (
    //     <header className='loggedHeader'>
    //         <section>
    //             <div className='row'>
    //                 <div className='flex'>
    //                     <h1 className="logoText" style={{marginBottom:"0"}}>
    //                         <Link to="/dashboard">Gatherly</Link>
    //                     </h1>
    //                     {familyGroup && familyGroup.photo && (
    //                         <img 
    //                             src={familyGroup.photo} 
    //                             alt={familyGroup.family_name} 
    //                             title={familyGroup.family_name} 
    //                             className='loggedAvatar' 
    //                         />
    //                     )}
    //                     {/* <p>Welcome, {userName}!</p>
    //                     <button onClick={handleLogout}>Logout</button> */}
    //                 </div>
    //             </div>
    //         </section>
    //     </header>
    // );
};

export default Header;
