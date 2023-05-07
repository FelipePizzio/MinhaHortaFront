import { Platform } from 'react-native'
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'
import { Home } from '@screens/Home'
import { Profile } from '@screens/Profile'
import { Box, useTheme } from 'native-base'

import HomeSvg from '@assets/home.svg'
import ProfileSvg from '@assets/profile.svg'
import { AddPlantation } from '@screens/AddPlantation'

type AppRoutesType = {
  home: undefined
  profile: undefined
  plantation: undefined
  addPlantation: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutesType>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesType>()

export function AppRoutes() {
  const { sizes, colors } = useTheme()
  const iconSize = sizes[6]

  return (
    <Box flex={1} backgroundColor="gray.700">
      <Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.green[500],
          tabBarInactiveTintColor: colors.gray[200],
          tabBarStyle: {
            backgroundColor: colors.gray[600],
            borderTopWidth: 0,
            height: Platform.OS === 'android' ? 'auto' : 96,
            paddingBottom: sizes[10],
            paddingTop: sizes[6],
          },
        }}
      >
        <Screen
          name="home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <HomeSvg fill={color} width={iconSize} height={iconSize} />
            ),
          }}
        />

        <Screen
          name="plantation"
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => (
              <ProfileSvg fill={color} width={iconSize} height={iconSize} />
            ),
          }}
        />

        <Screen
          name="profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => (
              <ProfileSvg fill={color} width={iconSize} height={iconSize} />
            ),
          }}
        />

        {/* Exemplo de rota que não aparece no BottomNavigator */}

        <Screen
          name="addPlantation"
          component={AddPlantation}
          options={{
            tabBarButton: () => null,
          }}
        />
      </Navigator>
    </Box>
  )
}
