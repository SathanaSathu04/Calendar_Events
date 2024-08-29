import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './index.css'; // Import the default styles

const App = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({}); // Store events in an object with date keys
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');

  // Handle date change on the calendar
  const onChange = (newDate) => {
    setDate(newDate);
    setSelectedEvent(null); // Reset the selected event when a new date is chosen
  };

  // Add a new event
  const addEvent = () => {
    const title = prompt('Enter event title:');
    const category = prompt('Enter event category (Work/Personal):');
    const description = prompt('Enter event description:');
    const formattedDate = date.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD

    if (title && category) {
      const newEvent = { title, category, description };
      setEvents({
        ...events,
        [formattedDate]: [...(events[formattedDate] || []), newEvent],
      });
    }
  };

  // Edit an event
  const editEvent = (eventIndex) => {
    const formattedDate = date.toISOString().split('T')[0];
    const eventToEdit = events[formattedDate][eventIndex];

    const newTitle = prompt('Edit event title:', eventToEdit.title);
    const newCategory = prompt('Edit event category (Work/Personal):', eventToEdit.category);
    const newDescription = prompt('Edit event description:', eventToEdit.description);

    const updatedEvent = {
      title: newTitle || eventToEdit.title,
      category: newCategory || eventToEdit.category,
      description: newDescription || eventToEdit.description,
    };

    const updatedEvents = events[formattedDate].map((event, index) =>
      index === eventIndex ? updatedEvent : event
    );

    setEvents({ ...events, [formattedDate]: updatedEvents });
  };

  // Delete an event
  const deleteEvent = (eventIndex) => {
    const formattedDate = date.toISOString().split('T')[0];
    const updatedEvents = events[formattedDate].filter((_, index) => index !== eventIndex);

    setEvents({ ...events, [formattedDate]: updatedEvents });
  };

  // View event details
  const viewEventDetails = (eventIndex) => {
    const formattedDate = date.toISOString().split('T')[0];
    setSelectedEvent(events[formattedDate][eventIndex]);
  };

  // Filter events by category
  const filteredEvents = (events[date.toISOString().split('T')[0]] || []).filter(
    (event) => !categoryFilter || event.category.toLowerCase() === categoryFilter.toLowerCase()
  );

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>React Calendar with Events</h1>
      <Calendar onChange={onChange} value={date} />
      <p>
        <strong>Selected Date:</strong> {date.toDateString()}
      </p>

      <div>
        <button onClick={addEvent}>Add Event</button>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ marginLeft: '10px' }}
        >
          <option value="">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>

      <div>
        <h2>Events on {date.toDateString()}:</h2>
        <ul>
          {filteredEvents.map((event, index) => (
            <li key={index}>
              <strong>{event.title}</strong> ({event.category})
              <br />
              <button onClick={() => viewEventDetails(index)}>View Details</button>
              <button onClick={() => editEvent(index)} style={{ marginLeft: '5px' }}>Edit</button>
              <button onClick={() => deleteEvent(index)} style={{ marginLeft: '5px' }}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {selectedEvent && (
        <div>
          <h3>Event Details</h3>
          <p><strong>Title:</strong> {selectedEvent.title}</p>
          <p><strong>Category:</strong> {selectedEvent.category}</p>
          <p><strong>Description:</strong> {selectedEvent.description}</p>
          <button onClick={() => setSelectedEvent(null)}>Close Details</button>
        </div>
      )}
    </div>
  );
};

export default App;
