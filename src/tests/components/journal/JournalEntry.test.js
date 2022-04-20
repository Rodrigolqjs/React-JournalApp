import React from 'react';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from "redux-thunk";
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';


// jest.mock('../../../actions/notes', () => ({
//     activeNote: jest.fn()
// }))
// jest.mock('../../../../actions/notes', () => ({
//     startNewNote: jest.fn()
// }))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = {
    auth: {}
}

let store = mockStore(initState)
store.dispatch = jest.fn();

const note = {
    id: 10,
    date: 0,
    title: 'hola',
    body: 'mundo',
    url: 'https"//algunlugar.com/foto.jpg'
}

const wrapper = mount( 
    <Provider store={ store }>
        {/* <MemoryRouter> */}
            <JournalEntry {...note}/> 
        {/* </MemoryRouter> */}
    </Provider>
)


describe(' Pruebas en <JournalEntry />', () => {
    
    test('debe de mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();

    })

    test('debe de activar la nota', () => {
        
        wrapper.find('.journal__entry').prop('onClick')();

        expect(store.dispatch).toHaveBeenCalledWith(
            activeNote( note.id, {...note} )
        )

    })
    
    

})
