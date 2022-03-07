
import React from 'react';
import { Dashboard } from './src/screens/Dashboard';
import { ThemeProvider } from 'styled-components'


import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme'
import AppLoading from 'expo-app-loading';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })//onde as fonte são carregadas

  if(!fontsLoaded){
    return <AppLoading/>//não carrega a aplicação enquanto as fontes não forem carregadas
  }

  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  )
}

