/** * @jest-environment node */

import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import configureStore from 'redux-mock-store' //ES6 modules
 import thunk from "redux-thunk";
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../../actions/notes';
import { db } from '../../../firebase/firebase-config';
import { types } from '../../../types/types';

const middlewares = [thunk]
const mockStore = configureStore( middlewares )

const initState = {
        auth: {
            uid: 'testing',
        }
}

let store = mockStore(initState)

describe('Pruebas en actions/notes', () => {

    beforeEach( () => {
        store = mockStore(initState)
    })

    test('startNewNote debe de crear una nueva nota', async() => {
        
        await store.dispatch( startNewNote() );
        
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        })

        const docId = actions[0].payload.id;
        const noteDoc = doc( db, `testing/journal/notes/${docId}` )
        await deleteDoc( noteDoc )


        

    })

    test('startLoadingNotes debe de funcionar', async() => {


    await store.dispatch( startLoadingNotes('testing') )
    
    const actions = store.getActions();

    expect( actions[0] ).toEqual({
        type: types.notesLoad,
        payload: expect.any(Array)
    })
    const expected = {
        id: expect.any(String),
        title: expect.any(String),
        body: expect.any(String),
        date: expect.any(Number),
    }
    expect( actions[0].payload[0] ).toMatchObject( expected )

})

    test('startSaveNote debe de actualizar una nota', async() => {

        const note = {
            id: '0b520HjIFfDUI8pyhGxY',
            title: 'hola',
            body: 'Incredible Body',
            date: 12351253456,
        }

        await store.dispatch( startSaveNote( note ) )
        
        const actions = store.getActions();

        expect( actions[0].type ).toBe( types.notesUpdated )

        const noteDoc = await getDoc( doc( db, `testing/journal/notes/${note.id}` ) )

        expect(noteDoc.data().title).toBe( note.title )

    })


})


