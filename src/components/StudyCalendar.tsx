import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);


const StudyCalendar: React.FC = () => {
    const [events, setEvents] = useState<Array<any>>([]); // Lista de eventos

    
    useEffect(() => {
        const fetchTasks = async () => {
          try {
            const response = await fetch('http://localhost:3000/tasks');
            const data = await response.json();
    
            // Formatear las tareas para el calendario
            const formattedEvents = data.map((task: any) => ({
              title: task.title,
              start: new Date(task.startDate),  // Fecha de inicio
              end: new Date(task.endDate)  // Fecha de fin
            }));
    
            setEvents(formattedEvents);  // Establecer los eventos en el estado
          } catch (error) {
            console.error('Error al cargar las tareas:', error);
          }
        };
    
        fetchTasks();
      }, []);
  
    return (
      <div className="max-w-4xl mx-auto mt-4">
        <Calendar
          localizer={localizer}
          events={events}  // Los eventos del calendario
          startAccessor="start"  // La fecha de inicio del evento
          endAccessor="end"  // La fecha de fin del evento
          style={{ height: 500 }}  // Estilo del calendario
        />
      </div>
    );
  };
  
  export default StudyCalendar;
  