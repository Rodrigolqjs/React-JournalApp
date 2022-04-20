import React from 'react';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from "redux-thunk";
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { AppRouter } from '../../routers/AppRouter';
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { login } from '../../actions/auth';


jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}))
jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}))
const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 'abc',
        },
        notes: []
    }
}

let store = mockStore(initState)
store.dispatch = jest.fn();

describe('Pruebas en <AppRouter />', () => {
    
    // console.log(process.env);
    test('debe de llamar el login si estoy auntenticado', async() => {

        // let user;

        // await act( async() => {

        //     const auth = getAuth();
        //     const userCred = await signInWithEmailAndPassword(auth, 'rodrigo.latorre@gmail.com', 'rlq12345')
        //     user = userCred.user;


        //     const wrapper = mount( 
        //         <Provider store={ store }>
        //             <MemoryRouter>
        //                 <AppRouter /> 
        //             </MemoryRouter>
        //         </Provider>
        //     )

        // })

        // expect(login).toHaveBeenCalledWith("OC1FNKj22KRWXsqWAAtSXfE3oyo2", null);

    })
    


})
