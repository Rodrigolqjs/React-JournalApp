/** * @jest-environment node */

import { doc, getDoc } from 'firebase/firestore';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from "redux-thunk";


jest.mock('../../../helpers/fileUpload', () => {
    return {
        fileUpload: () => {
            return Promise.resolve(
                "https://holamundo.com/cosa.jpg"
            );
        },
    };
});

import { startUploading } from '../../../actions/notes';
import { db } from '../../../firebase/firebase-config';

global.scrollTo = jest.fn(); 

const middlewares = [thunk]
const mockStore = configureStore( middlewares )
const initState = {
    auth: {
        uid: 'testing',
    },
    notes: {
        active: {
            id: '0b520HjIFfDUI8pyhGxY',
            title: 'hola',
            body: 'mundo'
        }
        
    }
}
let store = mockStore(initState)



test('startUploading debe de actalizar el url del entry', async() => {

    const file = [];
    // console.log(file);
    await store.dispatch( startUploading( file ) );

    const docRef = await getDoc( doc( db, `testing/journal/notes/0b520HjIFfDUI8pyhGxY` ) )

    expect( docRef.data().url ).toBe('https://holamundo.com/cosa.jpg')


})


