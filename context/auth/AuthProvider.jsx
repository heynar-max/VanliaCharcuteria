import { FC, useReducer, useEffect } from 'react';
import { AuthContext, authReducer } from './';
import Cookies from 'js-cookie';
import axios from 'axios';
import { vanliApi } from '@/api';
import { types } from '@/types/types';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';





const AUTH_INITIAL_STATE = {
    isLoggedIn: false,
    user: undefined,
}


export const AuthProvider= ({ children }) => {

    const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE );
    const { data , status} = useSession();
    const router = useRouter();


    useEffect(() => {
        if( status === 'authenticated'){
            console.log({user: data?.user});
            dispatch({type:types.Login, payload: data?.user})
        };
    }, [status, data])

    const checkToken = async() => {

        if ( !Cookies.get('token') ) {
            return;
        }
        try {
            const { data } = await vanliApi.get('/user/validate-token');
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type:types.Login, payload: user });
        } catch (error) {
            Cookies.remove('token');
        }
    }
    


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

    const registerUser = async( name, email, password ) => {

        try {
            const { data } = await vanliApi.post('/user/register', { name, email, password });
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type:types.Login, payload: user });
            return {
                hasError: false
            }

        } catch (error) {
            // cuando hay error de axios
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }
            // cuando no es error de axios
            return {
                hasError: true,
                message: 'No se pudo crear el usuario - intente de nuevo'
            }
        }
    }

    const logout = () => {
        
        Cookies.remove('cart');
        Cookies.remove('firstName');
        Cookies.remove('lastName');
        Cookies.remove('address');
        Cookies.remove('address2');
        Cookies.remove('zip');
        Cookies.remove('city');
        Cookies.remove('country');
        Cookies.remove('phone');

        signOut();
    
    }


    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            loginUser,
            registerUser,
            logout,

        }}>
            { children }
        </AuthContext.Provider>
    )
};