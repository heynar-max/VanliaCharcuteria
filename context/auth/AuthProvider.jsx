import { FC, useReducer, useEffect } from 'react';
import { AuthContext, authReducer } from './';
import Cookies from 'js-cookie';
import axios from 'axios';

import { tesloApi } from '../../api';
import { IUser } from '../../interfaces';




const AUTH_INITIAL_STATE = {
    isLoggedIn: false,
    user: undefined,
}


export const AuthProvider= ({ children }) => {

    const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE );


    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            

        }}>
            { children }
        </AuthContext.Provider>
    )
};