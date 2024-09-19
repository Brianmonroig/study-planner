import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task{
    id: number;
    title: string;
    completed: boolean;

}

const initialState: Task[] = [];


export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        //action to add task
        addTask: (state, action: PayloadAction<string>) =>{
            const newTask: Task ={
                id: Date.now(),
                title: action.payload,
                completed: false,
            };
            state.push(newTask);
        },
        // action to toggle taks completed
        toggleTask: (state, action: PayloadAction<number>) =>{
            const task = state.find((t) => t.id === action.payload);
            if(task){
                task.completed = !task.completed;
            }
        },
        removeTask: (state, action: PayloadAction<number>) =>{
            return state.filter((task) => task.id !== action.payload);
        }
    }
})

export const { addTask, toggleTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;