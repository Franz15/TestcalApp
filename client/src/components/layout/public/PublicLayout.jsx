import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {useAuth} from '../../../hooks/useAuth';
import {Header} from './Header';
import { Footer } from './Footer';

export const PublicLayout = () =>{

    const {auth}= useAuth();




    return (
        <>

            {/* Contenido Principal */}
            <section className="layout__content">
                {!auth._id?
                    <Outlet/>
                    :
                    <Navigate to ="/social/"/>
            }
            </section>
        </>
    )
}