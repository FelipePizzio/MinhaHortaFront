import React from 'react'
import { NativeBaseProvider } from 'native-base'
import { StatusBar } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { Loading } from '@components/Loading'
import { THEME } from './src/theme'
import { Routes } from '@routes/index'
import { AuthContextProvider } from '@contexts/AuthContext'
import { OneSignal } from 'react-native-onesignal'
import { ID_ONESIGNAL } from '@env'

OneSignal.initialize(ID_ONESIGNAL)

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  )
}
