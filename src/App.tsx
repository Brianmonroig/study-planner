import React from 'react';
import logo from './logo.svg';
import './App.css';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import NavBar from './components/NavBar';
import TaskScheduler from './components/TaskScheduler';

function App() {
  return (
    <div className="py min-h-screen bg-blue-100 p-4">
      <NavBar/>
      <h1 className="font-bold text-4xl text-center">Study Planner</h1>
      {/* <AddTaskForm/> */}
      <TaskList/>
      <h1>Organizador tareas</h1>
      <TaskScheduler/>
    </div>
  );
}

export default App;
