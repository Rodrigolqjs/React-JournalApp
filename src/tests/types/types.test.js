import { types } from "../../types/types"



describe('pruebas en types', () => {

    
    


    test('debe de tener los types correctos', () => {
        
        const typesPruebas = {

            login: '[Auth] Login',
            logout: '[Auth] Logout',
        
            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',
        
            uiStartLoading: '[UI] Start loading',
            uiFinishLoading: '[UI] Finish loading',
        
            notesAddNew: '[Notes] New Note',
            notesActive: '[Notes] Set Active Note',
            notesLoad: '[Notes] Load Note',
            notesUpdated: '[Notes] Update Note',
            notesFileUrl: '[Notes] Updated img url',
            notesDelete: '[Notes] Deleted Note',
            notesLogoutCleaning: '[Notes] Logout Cleaning'
        
        }

        expect(types).toEqual(typesPruebas)

    })
    

})

