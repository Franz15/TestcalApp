import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'

export const Logout = () => {
    
    const {setAuth} = useAuth();
    const navigate = useNavigate();


    useEffect(()=>{
        //Vaciar el localstorage
        localStorage.clear();

        //Setear estados globales a vacío
        setAuth({});
        
        //Navigate al login
        navigate("/login");
        
    });

    return (
        <h2>Cerrando sesión...</h2>
    )
 
}
