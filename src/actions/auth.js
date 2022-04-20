// import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { googleAuthProvider } from '../firebase/firebase-config';
import {types} from '../types/types';
import { finishLoading, startLoading } from './ui';
import Swal from 'sweetalert2'
import { notesLogout } from './notes';
 
export const startLoginEmailPassword = (email, password) =>{
    return (dispatch) => {

        // console.log(email, password);
            dispatch( startLoading() );

            const auth = getAuth();

            return signInWithEmailAndPassword(auth, email, password)

            .then(({ user }) => {
                // console.log(user.uid, user.displayName);
                dispatch( login(user.uid, user.displayName) )
                dispatch( finishLoading() );
                
            })

            .catch( e => {
                console.log(e);
                dispatch( finishLoading() )
                Swal.fire( 'Fail', e.message, 'error' );
            } );
    }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {

    return (dispatch) => {
        
        const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
            .then( async({ user }) => {
 
                await updateProfile( user, { displayName: name });
                
            })

            .catch( e => {
                console.log(e);
                Swal.fire( 'Fail', e.message, 'error' );
            })
    }
}
 
export const startGoogleLogin = () =>{
    return (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) =>{
                dispatch(login(user.uid, user.displayName))
            });
    }
}
 
export const login = (uid, displayName) =>(
    {
        type:types.login,
        payload: {
            uid,
            displayName
        }
    }
);

export const startLogout = () => {
    return async( dispatch ) => {
        const auth = getAuth();
        await signOut(auth)

        dispatch( logout() )
        dispatch(notesLogout())
    }
}

export const logout = () => ({
    type: types.logout
})

