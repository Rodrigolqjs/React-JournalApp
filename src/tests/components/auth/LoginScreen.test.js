import React from 'react';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from "redux-thunk";
import { LoginScreen } from "../../../components/auth/LoginScreen"
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}))
const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
}

let store = mockStore(initState)
store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <MemoryRouter>
            <LoginScreen /> 
        </MemoryRouter>
    </Provider>
)

describe('pruebas en LoginScreen', () => {
    
    beforeEach( () => {
        store = mockStore(initState);
        jest.clearAllMocks();
    })

    test('debe de mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();

    });

    test('debe de disparar la accion de startGoogleLogin', () => {
        
        wrapper.find('.google-btn').prop('onClick')();

        expect( startGoogleLogin ).toHaveBeenCalled();

    });

    test('debe de disparar el startLogin con sus respectivos argumentos', () => {
        
        wrapper.find('form').prop('onSubmit')(
            { preventDefault(){} }
        );

        expect( startLoginEmailPassword ).toHaveBeenCalledWith('Rodrigo.latorre@gmail.com', 'rlq12345');

    })
    
    
})
