import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';  // Importamos Axios

const TaskScheduler: React.FC = () => {
  const [task, setTask] = useState('');  
  const [hoursPerDay, setHoursPerDay] = useState<number | null>(null);  
  const [deadline, setDeadline] = useState<string>('');  
  const [error, setError] = useState<string | null>(null);  
  const [subtasks, setSubtasks] = useState<Array<any>>([]);  // Almacenar las subtareas generadas por la IA
  const [isLoading, setIsLoading] = useState<boolean>(false);  // Estado para indicar si está cargando
  const [canSubmit, setCanSubmit] = useState<boolean>(true);  // Controla el tiempo entre solicitudes

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Bloquear múltiples solicitudes rápidas
    if (!canSubmit) {
      setError('Por favor, espera unos segundos antes de enviar otra solicitud.');
      return;
    }

    // Validaciones
    if (!task.trim()) {
      setError('Por favor ingresa una tarea.');
      return;
    }
    if (!hoursPerDay || hoursPerDay <= 0) {
      setError('Por favor ingresa un número válido de horas por día.');
      return;
    }
    if (!deadline || moment(deadline).isBefore(moment())) {
      setError('Por favor ingresa una fecha límite válida.');
      return;
    }

    const currentDate = moment();
    const deadlineDate = moment(deadline);
    const daysAvailable = deadlineDate.diff(currentDate, 'days') + 1;

    // Indicador de carga
    setIsLoading(true);
    setError(null);  // Reseteamos cualquier error anterior

    // Enviar la solicitud a la API de IA
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: `Organiza la tarea "${task}" en subtareas y distribuye ${hoursPerDay} horas por día durante ${daysAvailable} días.` }
        ],
        max_tokens: 100,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const data = response.data;
      console.log(data);
      // Aquí asumimos que la respuesta de la IA es un array de subtareas
      setSubtasks(data.choices[0].text.split('\n').filter(Boolean));  // Filtrar para eliminar subtareas vacías

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          setError('Has alcanzado el límite de solicitudes. Por favor, espera un momento antes de intentarlo de nuevo.');
        } else {
          console.error('Axios error:', error.response?.data);  // Imprimir más detalles del error
          console.error('Status:', error.response?.status);  // Código de estado HTTP
          console.error('Headers:', error.response?.headers);  // Headers de la respuesta
          setError('Error al organizar las tareas. Inténtalo de nuevo.');
        }
      } else {
        console.error('Error:', error);
        setError('Error al organizar las tareas. Inténtalo de nuevo.');
      }
    } finally {
      setIsLoading(false);  // Finalizamos el indicador de carga
      setCanSubmit(false);  // Bloquear temporalmente las solicitudes
      setTimeout(() => setCanSubmit(true), 30000);  // Esperar 30 segundos antes de permitir otra solicitud
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Organizador de tareas</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-semibold">Tarea principal:</label>
          <input 
            type="text" 
            value={task} 
            onChange={(e) => setTask(e.target.value)} 
            className="border p-2 rounded-md mt-1"
            placeholder="Ejemplo: Aprender HTML"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Horas por día:</label>
          <input 
            type="number" 
            value={hoursPerDay || ''} 
            onChange={(e) => setHoursPerDay(Number(e.target.value))} 
            className="border p-2 rounded-md mt-1"
            placeholder="Horas diarias"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Fecha límite:</label>
          <input 
            type="date" 
            value={deadline} 
            onChange={(e) => setDeadline(e.target.value)} 
            className="border p-2 rounded-md mt-1"
          />
        </div>
        
        {error && <p className="text-red-500">{error}</p>}  
        
        <button 
          type="submit" 
          className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 ${isLoading && 'opacity-50 cursor-not-allowed'}`} 
          disabled={isLoading || !canSubmit}
        >
          {isLoading ? 'Organizando...' : 'Organizar'}
        </button>
      </form>

      {/* Mostrar las subtareas sugeridas por la IA */}
      {subtasks.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Subtareas sugeridas:</h3>
          <ul className="list-disc list-inside">
            {subtasks.map((subtask, index) => (
              <li key={index} className="mt-2">{subtask}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskScheduler;
