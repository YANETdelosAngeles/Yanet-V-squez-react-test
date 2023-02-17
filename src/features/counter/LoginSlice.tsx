import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: "1",
        nombre: "admin",
        primerApellido: "Zanahoria",
        segundoApellido: "Papa",
        correo: "soyeladmin@gmail.com",
        contraseña: "1234567",
        session: false,
    },
]

export const counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        logIn: (state, action) => {            
            const {id} = action.payload;

            const foundUser = state.find(user => user.id === id);

            if(foundUser)
            {
                foundUser.session = true;
            }
        },
        logOut: (state, action) => {            
            const {id} = action.payload;

            const foundUser = state.find(user => user.id === id);

            if(foundUser)
            {
                foundUser.session = false;
            }
        } 
    },
})

export const { logIn, logOut } = counterSlice.actions

export default counterSlice.reducer