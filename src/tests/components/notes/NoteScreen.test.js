import React from 'react';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from "redux-thunk";
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { activeNote } from '../../../actions/notes';
import { NoteScreen } from '../../../components/notes/NoteScreen';

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
}))
// jest.mock('../../../../actions/notes', () => ({
//     startNewNote: jest.fn()
// }))

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
            title: 'hola,',
            body: 'mundo',


        },
        notes: []
    }

}

let store = mockStore(initState)
store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        {/* <MemoryRouter> */}
            <NoteScreen /> 
        {/* </MemoryRouter> */}
    </Provider>
)



describe('Pruebas en <NoteScreen />', () => {
    
    test('debe de mostrarse correctamente', () => {
        
        expect(wrapper).toMatchSnapshot();

    })

    test('debe de disparar el active note', () => {
        
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola de nuevo'
            }
        });

        expect( activeNote ).toHaveBeenLastCalledWith( 
            'abc',
            {
                body: 'mundo',
                title: 'Hola de nuevo',
                id: 'abc',
            }
        );

    })
    
    
})
