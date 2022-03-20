
import React from 'react';

import { ThemeProvider } from 'styled-components'
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';


import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme'
import AppLoading from 'expo-app-loading';

import { Routes } from './src/routes'
import { AppRoutes } from './src/routes/app.routes'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { SignIn } from './src/screens/SignIn';

import { AuthProvider, useAuth  } from './src/hooks/auth';


export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })//onde as fonte são carregadas

  const { userStorageLoading } = useAuth();

  if(!fontsLoaded || userStorageLoading){
    return <AppLoading/>//não carrega a aplicação enquanto as fontes não forem carregadas
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}

