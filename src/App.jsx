import React, { useState } from 'react';
import './index.css'; // Importing the CSS for styling

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [showEventForm, setShowEventForm] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventDescription, setEventDescription] = useState('');
  const [eventCategory, setEventCategory] = useState('Work');
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState('All');

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

  const handleDayClick = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
    setSelectedDate(date);
    setShowEventForm(true);
  };

  const handleAddEvent = () => {
    if (eventDescription.trim()) {
      const updatedEvents = { ...events };
      if (editIndex !== null) {
        updatedEvents[selectedDate][editIndex] = { description: eventDescription, category: eventCategory };
      } else {
        updatedEvents[selectedDate] = [
          ...(updatedEvents[selectedDate] || []),
          { description: eventDescription, category: eventCategory },
        ];
      }
      setEvents(updatedEvents);
      setShowEventForm(false);
      setEventDescription('');
      setEventCategory('Work');
      setEditIndex(null);
    }
  };

  const handleEditEvent = (index) => {
    setEventDescription(events[selectedDate][index].description);
    setEventCategory(events[selectedDate][index].category);
    setEditIndex(index);
    setShowEventForm(true);
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = { ...events };
    updatedEvents[selectedDate] = updatedEvents[selectedDate].filter((_, i) => i !== index);
    if (updatedEvents[selectedDate].length === 0) {
      delete updatedEvents[selectedDate];
    }
    setEvents(updatedEvents);
    setShowEventDetails(true);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredEvents = Object.keys(events).flatMap(date => 
    events[date].filter(event => filter === 'All' || event.category === filter).map(event => ({ ...event, date }))
  );

  const days = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Add day names
  dayNames.forEach((name, index) => {
    days.push(<div key={`day-name-${index}`} className="calendar-day-name">{name}</div>);
  });

  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(
      <div
        key={day}
        className="calendar-day"
        onClick={() => handleDayClick(day)}
      >
        {day}
        {events[new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()] && (
          <span className="event-indicator"></span>
        )}
      </div>
    );
  }

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>Prev</button>
        <h2>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <div className="calendar-days-of-week">
        {days.slice(0, 7)} {/* Only display the day names */}
      </div>
      <div className="calendar-grid">
        {days.slice(7)} {/* Skip the day names and display the days of the month */}
      </div>
      {showEventForm && (
        <div className="event-form">
          <h3>{editIndex !== null ? 'Edit Event' : 'Add Event'}</h3>
          <input
            type="text"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            placeholder="Event Description"
          />
          <select value={eventCategory} onChange={(e) => setEventCategory(e.target.value)}>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
          <button onClick={handleAddEvent}>{editIndex !== null ? 'Update Event' : 'Add Event'}</button>
          <button onClick={() => setShowEventForm(false)}>Cancel</button>
        </div>
      )}
      <div className="calendar-buttons">
        <button className="event-details" onClick={() => setShowEventDetails(true)}>Event Details</button>
        <button className="filter-events" onClick={() => setShowFilter(!showFilter)}>Filter Events</button>
      </div>
      {showEventDetails && (
        <div className="event-list">
          <h3>All Events</h3>
          {showFilter && (
            <select value={filter} onChange={handleFilterChange}>
              <option value="All">All</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
            </select>
          )}
          <ul>
            {filteredEvents.length === 0 ? (
              <div className="no-events-message">No events added to the calendar.</div>
            ) : (
              filteredEvents.map((event, index) => (
                <li key={index}>
                  {event.date}: {event.description} ({event.category})
                  <button className="edit-event" onClick={() => handleEditEvent(index)}>Edit</button>
                  <button className="delete-event" onClick={() => handleDeleteEvent(index)}>Delete</button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;



    
     
 
        
             
          
        
            
