// src/Sidenavbar.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CiCirclePlus } from "react-icons/ci";

const Sidenavbar = ({ onFamilySelect }) => {
    const navigate = useNavigate();
    const [familyGroups, setFamilyGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFamilyGroups = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('https://gatherly-app.onrender.com/api/family-group/joined', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setFamilyGroups(response.data.familyGroups || []);
            } catch (error) {
                console.error('Error fetching family groups:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFamilyGroups();
    }, [navigate]);

    const handleAddFamily = () => {
        navigate('/intro');
    };

    return (
        <div className="sidenav" style={{ padding: '15px', borderRight: '1px solid #ccc', height: '100vh' }}>
            {loading ? (
                <p>Loading families...</p>
            ) : (
                <div className='flex flex-col'>
                    {familyGroups.length === 0 ? (
                        <p>You are not a member of any family groups.</p>
                    ) : (
                        familyGroups.map((group) => (
                            <div
                                key={group._id}
                                onClick={() => onFamilySelect(group)} // Trigger the family selection
                                className='flex items-center mb-5 cursor-pointer'
                            >
                                {group.photo && (
                                    <img 
                                        src={group.photo} 
                                        alt={`${group.family_name} Family`} 
                                        style={{ width: '80px', height: '80px', borderRadius: '50%', marginRight: '10px', objectFit: 'cover'}} 
                                        className='border-2 border-[#FF6F00]'
                                    />
                                )}
                                <span className='text-2xl'>{group.family_name}</span>
                            </div>
                        ))
                    )}
                    <CiCirclePlus className="text-[100px] text-[#FF6F00] hover:text-[#FF6F00] mr-2 cursor-pointer" onClick={handleAddFamily} />
                </div>
            )}
        </div>
    );
};

export default Sidenavbar;
