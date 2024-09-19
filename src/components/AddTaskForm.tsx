import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from '../features/tasks/taskSlice';

const AddTaskForm = () => {
    const [text, setText] = useState<string>('');
    const dispatch = useDispatch();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const  handleTaskSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
        if (text.trim()) {
            try{
                const response = await fetch('http://localhost:3000/tasks',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({text}),
                });

                if(response.ok){
                    dispatch(addTask(text));
                    setText(''); // Clear the input field after submission

                }
            } catch (error){
                console.error('error al añadir la tarea:', error)
            }
        }
    };

    return (
        <div className="max-w-md mx-auto pt-4  flex flex-col justify-center items-center space-x-4">
            <form onSubmit={handleTaskSubmit}>
                <input 
                    type="text"
                    value={text}
                    onChange={handleInputChange} 
                    className="p-2 border rounded-md "
                />
                <button type="submit"
                className="bg-blue-500 text-white hover:bg-blue-600 rounded-md p-2 mt-4 ml-4 mb-4"
                >Add Task</button>
            </form>
        </div>
    );
};

export default AddTaskForm;
