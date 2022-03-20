import React from "react";
import { NavigationContainer } from '@react-navigation/native'

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { useAuth } from '../hooks/auth';


export function Routes(){
     //se há valores em user, significa que o o usuário está autenticado
     const { user } = useAuth()
    


    return(
        <NavigationContainer>
           {user.id ? <AppRoutes/> : <AuthRoutes /> }
        </NavigationContainer>
    )
}