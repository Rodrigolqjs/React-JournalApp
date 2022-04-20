import { finishLoading, removeError, setError, startLoading } from "../../actions/ui"
import { types } from "../../types/types"

describe('pruebas en actions/ui', () => {

    test('todas las acciones deben de funcionar', () => {
        
        const action = setError('Help!!')

        expect( action ).toEqual({
            type: types.uiSetError,
            payload: 'Help!!'
        });
        const startLoadingAction = startLoading();
        const removeErrorAction = removeError();
        const finishLoadingAction = finishLoading();
    
        expect(startLoadingAction).toEqual({
            type: types.uiStartLoading
        })
        expect(removeErrorAction).toEqual({
            type: types.uiRemoveError
        })
        expect(finishLoadingAction).toEqual({
            type: types.uiFinishLoading
        })

    })


})  
