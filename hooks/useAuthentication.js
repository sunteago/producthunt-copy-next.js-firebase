import React, {useEffect, useState} from 'react';
import firebase from '../firebase/index';

function useAutentication() {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);

    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(user => {
            if ( user) {
                setAuthenticatedUser(user);
            } else {
                setAuthenticatedUser(null);
            }
        });
        return () => unsuscribe();
    }, []);
    return authenticatedUser;
}
export default useAutentication;