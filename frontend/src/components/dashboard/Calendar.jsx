import React, { useState } from 'react';
import { FiCalendar, FiPlus, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const firstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const daysCount = daysInMonth(month, year);
  const firstDay = firstDayOfMonth(month, year);
  
  const events = [
    { id: 1, date: new Date(year, month, 15), title: 'Team Meeting', color: 'bg-blue-500' },
    { id: 2, date: new Date(year, month, 20), title: 'Webinar', color: 'bg-purple-500' },
    { id: 3, date: new Date(year, month, 22), title: 'Deadline', color: 'bg-red-500' },
  ];
  
  const changeMonth = (increment) => {
    setCurrentDate(new Date(year, month + increment, 1));
  };
  
  const renderDays = () => {
    const days = [];
    const today = new Date();
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 p-1 border border-gray-100"></div>);
    }
    
    // Cells for each day of the month
    for (let day = 1; day <= daysCount; day++) {
      const date = new Date(year, month, day);
      const dayEvents = events.filter(event => 
        event.date.getDate() === day && 
        event.date.getMonth() === month && 
        event.date.getFullYear() === year
      );
      
      const isToday = date.getDate() === today.getDate() && 
                     date.getMonth() === today.getMonth() && 
                     date.getFullYear() === today.getFullYear();
      
      days.push(
        <div 
          key={`day-${day}`} 
          className={`h-24 p-1 border border-gray-100 ${isToday ? 'bg-blue-50' : ''}`}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm font-medium ${isToday ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}`}>
              {day}
            </span>
            <button className="text-gray-400 hover:text-blue-600 text-xs">
              <FiPlus size={12} />
            </button>
          </div>
          <div className="mt-1 space-y-1 overflow-y-auto max-h-16">
            {dayEvents.map(event => (
              <div 
                key={event.id} 
                className={`text-xs p-1 rounded text-white truncate ${event.color}`}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return days;
  };
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Calendar</h2>
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <FiPlus className="mr-2" />
            Add Event
          </button>
        </div>
      </div>
      
      <div className="mb-6 flex items-center justify-between">
        <button 
          onClick={() => changeMonth(-1)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <FiChevronLeft />
        </button>
        <h3 className="text-xl font-semibold text-gray-800">
          {monthNames[month]} {year}
        </h3>
        <button 
          onClick={() => changeMonth(1)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <FiChevronRight />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-0">
        {dayNames.map(day => (
          <div key={day} className="text-center font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-0">
        {renderDays()}
      </div>
      
      <div className="mt-6">
        <h4 className="font-medium text-gray-800 mb-3">Upcoming Events</h4>
        <div className="space-y-3">
          {events.filter(event => event.date >= new Date()).map(event => (
            <div key={event.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
              <div className={`w-3 h-3 rounded-full mt-1.5 ${event.color}`}></div>
              <div className="ml-3">
                <p className="font-medium text-gray-800">{event.title}</p>
                <p className="text-sm text-gray-500">
                  {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  {', '}
                  {event.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;