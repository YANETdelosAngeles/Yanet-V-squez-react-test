import { createSlice } from '@reduxjs/toolkit';


const initialState = [
    {
        id: 0,
        name: "",
        last_name: "",
        birthday: 0
    }
]

export const employeesSlice = createSlice({
    name: 'employees',
    initialState: initialState,
    reducers: {
        addEmployee: (state, action) => {   
            const {id} = action.payload;
            const foundEmployee = state.find(employee => employee.id === id); 
            
            if(!foundEmployee)
            {
                state.push(action.payload);
            }            
        },

        deleteEmployee: (state, action) => {    
            const employeeFind = state.find(employee => employee.id === action.payload)
            
            if(employeeFind)
            {
                state.splice(state.indexOf(employeeFind), 1);
            }
        },

        reset: () => initialState,

    },
})

export const { addEmployee, deleteEmployee, reset } = employeesSlice.actions

export default employeesSlice.reducer