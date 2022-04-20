import { bindActionCreators } from 'redux';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from "redux-thunk";
import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth"
import { types } from '../../types/types';
import '@testing-library/jest-dom'

const middlewares = [thunk]
const mockStore = configureStore( middlewares )


const initState = {}

let store = mockStore(initState)


describe('pruebas en las acciones de Auth', () => {

    beforeEach( () => {
        store = mockStore(initState)
    })

    // test('login y logout deben de crear la accion respectiva', async() => {

    //     const respLogin = {
    //         type:types.login,
    //         payload: {
    //             uid: 1235125123,
    //             displayName: 'Rodrigo'
    //         }
    //     }
    //     const authData = {
    //         uid: 1235125123,
    //         displayName: 'Rodrigo'
    //     }
        
    //     await store.dispatch(login(authData.uid,authData.displayName))

    //     const actions = store.getActions();

    //     expect( actions[0] ).toEqual(respLogin)

    //     store.dispatch(logout())

    //     expect( actions[1] ).toEqual({ type: types.logout })
        
    // })

    // test('probando startLogout()', async() => {

    //     await store.dispatch( startLogout() );

    //     const actions = store.getActions(); 

    //     console.log(actions);

    //     expect( actions[0] ).toEqual({
    //         type: types.logout
    //     })
    //     expect( actions[1] ).toEqual({
    //         type: types.notesLogoutCleaning
    //     })
    // })

    test('probando startLoginEmailPassword', async() => {
      
        const userData = {
            email: 'Rodrigo.latorre@gmail.com',
            password: 'rlq12345'
        }

        await store.dispatch( startLoginEmailPassword(userData.email, userData.password) )

        const actions = store.getActions();
        
        expect( actions[1] ).toEqual({
            type: types.login,
            payload: {
                uid: 'OC1FNKj22KRWXsqWAAtSXfE3oyo2',
                displayName: null
            }
        })



    })
    
})


