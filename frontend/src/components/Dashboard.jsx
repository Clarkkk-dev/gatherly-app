import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidenavbar from "./Sidenavbar";
import Navbar from "./Navbar";
import Subnavbar from "./Subnavbar";
import CreateEvent from "./CreateEvent";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import Itinerary from "./Itinerary";
import Chat from "./Chat";

const Dashboard = () => {
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [selectedSection, setSelectedSection] = useState("home");
  const [events, setEvents] = useState([]);
  const [upcomingEvent, setUpcomingEvent] = useState(null);
  const [itinerary, setItinerary] = useState([]);
  const [date, setDate] = useState(new Date());
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const userName = localStorage.getItem("name") || "Guest";
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedFamily) {
      fetchEvents(selectedFamily._id);
    } else {
      setEvents([]);
      setItinerary([]);
    }
  }, [selectedFamily]);

  const fetchEvents = async (familyGroupId) => {
    setLoadingEvents(true);
    setErrorMessage(""); // Reset error message
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://gatherly-app.onrender.com/api/events/family-group/${familyGroupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const eventsData = response.data.events;
      setEvents(eventsData);
      findUpcomingEvent(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
      setErrorMessage("Failed to fetch events. Please try again later.");
    } finally {
      setLoadingEvents(false);
    }
  };

  const calculateDaysUntilEvent = (eventDate) => {
    const today = new Date();
    const eventDateTime = new Date(eventDate);
    const diffTime = eventDateTime - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const findUpcomingEvent = (events) => {
    const today = new Date();
    const upcomingEvents = events
      .filter((event) => new Date(event.date) > today)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    if (upcomingEvents.length > 0) {
      setUpcomingEvent(upcomingEvents[0]);
    }
  };

  const getEventsForDate = (selectedDate) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === selectedDate.getFullYear() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getDate() === selectedDate.getDate()
      );
    });
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const eventsForDate = getEventsForDate(date);

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidenavbar onFamilySelect={setSelectedFamily} />
        <div style={{ flex: 1, padding: "20px" }}>
          <Subnavbar
            selectedFamily={selectedFamily}
            onSelectSection={setSelectedSection}
            selectedSection={selectedSection}
          />
          <div>
            {selectedFamily ? (
              <div>
                {selectedSection === "home" && (
                  <>
                    {selectedFamily.photo && (
                      <div>
                        <img
                          src={selectedFamily.photo}
                          alt={`${selectedFamily.family_name} Family`}
                          className="w-full h-[400px] object-cover"
                        />
                      </div>
                    )}
                    {upcomingEvent && (
                      <div className="mt-20 p-5 rounded-lg">
                        <h3 className="text-7xl font-bold text-center mb-4">
                          Upcoming Event
                        </h3>
                        <p className="text-4xl font-bold text-center">
                          {upcomingEvent.title}
                        </p>
                        <p className="text-xl text-center">
                          {upcomingEvent.date}
                        </p>
                        <p className="text-center">
                          {calculateDaysUntilEvent(upcomingEvent.date)} days
                          until the event!
                        </p>
                      </div>
                    )}
                    <Calendar
                      onChange={handleDateChange}
                      value={date}
                      className="mt-10"
                    />
                    <h3 className="text-2xl font-bold mt-5">
                      Events on{" "}
                      {date.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h3>
                    <ul>
                      {eventsForDate.map((event) => (
                        <li key={event._id}>
                          <h4 className="font-bold">{event.title}</h4>
                          <p>{event.date}</p>
                        </li>
                      ))}
                    </ul>
                    {loadingEvents && <p>Loading events...</p>}
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                  </>
                )}
                {selectedSection === "createEvent" && (
                  <CreateEvent />
                )}
                {selectedSection === "itinerary" && <Itinerary />}
                {selectedSection === "chat" && <Chat />}
              </div>
            ) : (
              <h2 className="text-4xl">Please select a family group to continue</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
