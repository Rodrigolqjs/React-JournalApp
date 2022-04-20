import { FirebaseError } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { login } from '../actions/auth';
import { setNote, setNotes, startLoadingNotes } from '../actions/notes';
import { JournalScreen } from '../components/journal/JournalScreen';
import { loadNotes } from '../helpers/loadNotes';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';



export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, async(user) => {
            
            if ( user?.uid ) {
                dispatch(login( user.uid, user.displayName ))
                setIsLoggedIn( true );

                dispatch(startLoadingNotes( user.uid ))
                
            } else {
                setIsLoggedIn( false );
            }

            setChecking( false );

        })
    }, [ dispatch, setChecking, setIsLoggedIn ])

    if ( checking ) {
        return (
            <h1>wait...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        isAuthenticated={ isLoggedIn }
                        component={ AuthRouter }
                    />
                    <PrivateRoute
                        exact
                        isAuthenticated={ isLoggedIn }
                        path="/"
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}