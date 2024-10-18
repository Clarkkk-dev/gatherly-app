import React from 'react';

const Subnavbar = ({ selectedFamily, onSelectSection, selectedSection }) => {
  if (!selectedFamily) return null; // Return nothing if no family is selected

  const getButtonClass = (section) => {
    return selectedSection === section
      ? "text-[#FF6F00] font-bold border-b-4 border-[#FF6F00]" // Active style
      : "text-gray-500 hover:text-[#FF6F00]"; // Default style
  };

  return (
    <nav className='h-[150px] flex flex-col items-start border-b border-gray-300'>
      <h3 className='text-5xl font-bold text-[#FF6F00]'>{selectedFamily.family_name}</h3>
      <ul className="flex space-x-4 mt-4">
        <li className='text-2xl'>
          <button
            className={getButtonClass('home')}
            onClick={() => onSelectSection('home')}
          >
            Home
          </button>
        </li>
        <li className='text-2xl'>
          <button
            className={getButtonClass('events')}
            onClick={() => onSelectSection('events')}
          >
            Events
          </button>
        </li>
        <li className='text-2xl'>
          <button
            className={getButtonClass('itinerary')}
            onClick={() => onSelectSection('itinerary')}
          >
            Itinerary
          </button>
        </li>
        <li className='text-2xl'>
          <button
            className={getButtonClass('shopping')}
            onClick={() => onSelectSection('shopping')}
          >
            Shopping List
          </button>
        </li>
        <li className='text-2xl'>
          <button
            className={getButtonClass('tasks')}
            onClick={() => onSelectSection('tasks')}
          >
            Tasks
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Subnavbar;
