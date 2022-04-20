import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";
describe('pruebas en authReducer', () => {

    test('debe de funcionar el authReducer/login', () => {
        
        const initState = {};
        
        const action = {
            type: types.login,
            payload: {
                uid: 'abd',
                displayName: 'Rodrigo'
            }
        }
        
        const state = authReducer(initState, action)
        
        expect(state).toEqual({
            uid: 'abd',
            name: 'Rodrigo'
        })
        
    })
    test('debe de funcionar el authReducer/logout', () => {

        const initState = {};
        
        const action = {
            type: types.logout,
            payload: {
                uid: 'abd',
                displayName: 'Rodrigo'
            }
        }
        
        const state = authReducer(initState, action)
        
        expect(state).toEqual({})
        
    })
    test('debe de funcionar el authReducer/default', () => {
        
        const initState = {};
        
        const action = {
            type: 'asoiahs'
        }
        
        const state = authReducer(initState, action)
        
        expect(state).toEqual(initState)
        
    })
})