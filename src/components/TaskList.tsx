import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../store/store'
import { addTask, removeTask, toggleTask } from  '../features/tasks/taskSlice';




const TaskList = ( ) =>{
    const list = useSelector((state: RootState) => state.tasks);
    const dispatch = useDispatch();


    return(
        <div>
            {list.map((task)=>(
                <li key={task.id}>{task.title}</li>
            ))}
            
        </div>
    )
 

}

export default TaskList;