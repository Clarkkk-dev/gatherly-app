// src/components/CreateEvent.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CreateEvent = ({ selectedFamily }) => {
    const [uniqueCode, setUniqueCode] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

    useEffect(() => {
        const fetchEvents = async () => {
            if (!selectedFamily) return; // No family selected

            // Clear events when changing family
            setEvents([]);

            console.log("Selected Family ID:", selectedFamily._id); // Debugging output

            try {
                const response = await axios.get(`http://localhost:3000/api/events?familyId=${selectedFamily._id}`, { // Changed to localhost
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const formattedEvents = response.data.events.map(event => ({
                    title: event.title,
                    start: new Date(event.date),
                    end: new Date(event.date),
                }));
                setEvents(formattedEvents);
            } catch (error) {
                console.error('Error fetching events:', error.response ? error.response.data : error.message);
                setMessage('Failed to fetch events. Please try again later.');
            }
        };

        fetchEvents();
    }, [selectedFamily]); // Dependency on selectedFamily
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await axios.post('http://localhost:3000/api/events/create', // Changed to localhost
                { unique_code: uniqueCode, title, description, date, familyId: selectedFamily._id },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            if (response.status === 201) {
                const event = response.data.event;
                const formattedDate = new Date(event.date);
                setEvents(prevEvents => [...prevEvents, { title: event.title, start: formattedDate, end: formattedDate }]);
                setMessage(`Event created successfully: ${event.title}`);
                
                // Clear the form fields
                setUniqueCode('');
                setTitle('');
                setDescription('');
                setDate(new Date());
                
                // Close the modal after creating the event
                setIsModalOpen(false);
            }
        } catch (error) {
            if (error.response) {
                setMessage(`Error: ${error.response.data.message}`);
            } else {
                setMessage(`Error: ${error.message}`);
            }
        }
    };

    // Check if selectedFamily is available
    if (!selectedFamily) {
        return <div>Please select a family to view or create events.</div>;
    }

    return (
        <div className='mt-5'>
            <button 
                onClick={() => setIsModalOpen(true)} // Open modal on button click
                className="bg-[#FF6F00] p-3 text-white font-bold rounded-md mb-5"
            >
                Create Event
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-10 w-[400px]">
                        <h2 className='text-2xl mb-5 text-center font-bold'>Create an Event for {selectedFamily.family_name}</h2>
                        <form onSubmit={handleSubmit}> 
                            <div>
                                <input
                                    type="text"
                                    id="uniqueCode"
                                    value={uniqueCode}
                                    onChange={(e) => setUniqueCode(e.target.value)}
                                    placeholder='Family Code'
                                    required
                                    className='w-full'
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder='Title'
                                    required
                                    className='w-full'
                                />
                            </div>
                            <div>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder='Description'
                                    className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="date"
                                    id="date"
                                    value={moment(date).format('YYYY-MM-DD')}
                                    onChange={(e) => setDate(new Date(e.target.value))}
                                    required
                                    className='w-full'
                                />
                            </div>
                            <button type="submit" className="bg-[#FF6F00] p-3 text-white font-bold rounded-md mt-3 ">Create Event</button>
                        </form>
                        {message && <p>{message}</p>}
                        <button 
                            onClick={() => setIsModalOpen(false)} // Close modal
                            className="mt-3 text-gray-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateEvent;
