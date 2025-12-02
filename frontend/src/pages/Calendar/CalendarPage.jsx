import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from '../../features/projects/projectSlice';
import { getInvoices } from '../../features/invoices/invoiceSlice';
import Spinner from '../../components/Spinner';
import { Plus, Folder, FileText } from 'lucide-react';
import './Calendar.css';

const CalendarPage = () => {
  const dispatch = useDispatch();
  
  const { projects, isLoading: pLoading } = useSelector((state) => state.projects);
  const { invoices, isLoading: iLoading } = useSelector((state) => state.invoices);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getInvoices());
  }, [dispatch]);

  if (pLoading || iLoading) return <Spinner />;

  // --- CALENDAR LOGIC ---
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Get events for the *selected* day (sidebar)
  const getEventsForDate = (dateObj) => {
    const dateStr = dateObj.toDateString();
    const pEvents = projects.filter(p => new Date(p.deadline).toDateString() === dateStr);
    const iEvents = invoices.filter(i => new Date(i.dueDate).toDateString() === dateStr);
    return { pEvents, iEvents };
  };

  const { pEvents, iEvents } = getEventsForDate(selectedDate);

  // Helper to check if a specific day has ANY event (for the red dot)
  const hasEvent = (day) => {
    const checkDate = new Date(year, month, day).toDateString();
    return projects.some(p => new Date(p.deadline).toDateString() === checkDate) ||
           invoices.some(i => new Date(i.dueDate).toDateString() === checkDate);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-wrapper">
        
        {/* --- LEFT SIDEBAR --- */}
        <div className="calendar-sidebar">
          <div>
            <div className="current-day-number">{selectedDate.getDate()}</div>
            <div className="current-day-name">
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}
            </div>
            
            <div className="sidebar-events">
              <h3>Events Today</h3>
              <ul className="event-list">
                {pEvents.length === 0 && iEvents.length === 0 && <li>No events today</li>}
                
                {pEvents.map(p => (
                  <li key={p._id}><Folder size={14} /> Project: {p.title} Due</li>
                ))}
                {iEvents.map(i => (
                  <li key={i._id}><FileText size={14} /> Invoice #{i.invoiceNumber} Due</li>
                ))}
              </ul>
            </div>
          </div>

          <button className="create-event-btn">
            <Plus size={18} /> Add Event
          </button>
        </div>

        {/* --- RIGHT GRID --- */}
        <div className="calendar-main">
          <div className="calendar-main-header">
            <div className="month-selector">
              {monthNames.map((m, index) => (
                <span 
                  key={m} 
                  className={`month-item ${index === month ? 'active' : ''}`}
                  onClick={() => setCurrentDate(new Date(year, index, 1))}
                >
                  {m}
                </span>
              ))}
            </div>
            <div className="year-display">{year}</div>
          </div>

          <div className="calendar-days-grid">
            {/* Labels */}
            {dayNames.map(d => <div key={d} className="day-label">{d}</div>)}

            {/* Empty Slots */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="date-cell date-empty"></div>
            ))}

            {/* Dates */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = 
                day === selectedDate.getDate() && 
                month === selectedDate.getMonth() &&
                year === selectedDate.getFullYear();
              
              return (
                <div 
                  key={day} 
                  className={`date-cell ${isSelected ? 'active' : ''} ${hasEvent(day) ? 'has-event' : ''}`}
                  onClick={() => setSelectedDate(new Date(year, month, day))}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CalendarPage;