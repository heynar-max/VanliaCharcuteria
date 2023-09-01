import { FC, useReducer, useEffect } from 'react';
import { AuthContext, authReducer } from './';
import Cookies from 'js-cookie';
import axios from 'axios';
import { vanliApi } from '@/api';
import { types } from '@/types/types';





const AUTH_INITIAL_STATE = {
    isLoggedIn: false,
    user: undefined,
}


export const AuthProvider= ({ children }) => {

    const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE );

    


    const loginUser = async( email, password ) => {

        try {
            const { data } = await vanliApi.post('/user/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type:types.Login, payload: user });
            return true;
        } catch (error) {
            return false;
        }

    }

    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            loginUser,

        }}>
            { children }
        </AuthContext.Provider>
    )
};