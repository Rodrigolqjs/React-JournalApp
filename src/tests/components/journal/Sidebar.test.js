import React from 'react';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from "redux-thunk";
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { SideBar } from "../../../components/journal/SideBar"
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn()
}))
jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = {
    auth: {
        uid: 1,
        name: 'Rodrigo'
    },
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

const wrapper = mount( 
    <Provider store={ store }>
        {/* <MemoryRouter> */}
            <SideBar /> 
        {/* </MemoryRouter> */}
    </Provider>
)


describe('Pruebas en componente <Sidebar />', () => {

    test('debe de mostrarse correctamente', () => {
        
        expect(wrapper).toMatchSnapshot();
        
    })
    
    test('debe de llamar al startlogout', () => {
        
        wrapper.find('.btn').prop('onClick')();

        expect(startLogout).toHaveBeenCalled();

    })

    test('debe de llamar startnewnote', () => {
         
        wrapper.find('.journal__new-entry').prop('onClick')();

        expect(startNewNote).toHaveBeenCalled();

    })

})
