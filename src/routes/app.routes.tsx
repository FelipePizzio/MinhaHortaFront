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
import BooksSvg from '@assets/books.svg'
import { AddPlantation } from '@screens/AddPlantation'
import { PlantCatalog } from '@screens/PlantCatalog'
import { PlantationInfo } from '@screens/PlantationInfo'
import { PlantInfo } from '@screens/PlantInfo'

type AppRoutesType = {
  home: undefined
  profile: undefined
  plantationInfo: { plantationId: string }
  addPlantation: undefined
  plantCatalog: undefined
  plantInfo: { plantId: string }
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
          name="plantCatalog"
          component={PlantCatalog}
          options={{
            tabBarIcon: ({ color }) => (
              <BooksSvg fill={color} width={iconSize} height={iconSize} />
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

        <Screen
          name="addPlantation"
          component={AddPlantation}
          options={{
            tabBarButton: () => null,
          }}
        />

        <Screen
          name="plantationInfo"
          component={PlantationInfo}
          options={{
            tabBarButton: () => null,
          }}
        />

        <Screen
          name="plantInfo"
          component={PlantInfo}
          options={{
            tabBarButton: () => null,
          }}
        />
      </Navigator>
    </Box>
  )
}
