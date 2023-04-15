import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import { SignIn } from '@screens/SignIn'
import { SignUp } from '@screens/SignUp'
import { Box } from 'native-base'

type TypeAuthRoutes = {
  signIn: undefined
  signUp: undefined
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<TypeAuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator<TypeAuthRoutes>()

export function AuthRoutes() {
  return (
    <Box flex={1} backgroundColor="gray.700">
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="signIn" component={SignIn} />
        <Screen name="signUp" component={SignUp} />
      </Navigator>
    </Box>
  )
}
