import { HStack, Heading, Text, VStack, Icon, Center } from 'native-base'
import { UserPhoto } from './UserPhoto'
import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useAuth } from '@hooks/useAuth'

import defaultUserPhotoImg from '@assets/userPhotoDefault.png'

type Props = {
  isHome?: boolean
  title?: string
}

export function Header({ isHome, title }: Props) {
  const { user, signOut } = useAuth()

  return isHome ? (
    <HStack
      backgroundColor="gray.600"
      paddingTop={16}
      paddingBottom={5}
      paddingX={4}
      alignItems="center"
    >
      {/** 
      <UserPhoto
        source={user.avatar ? { uri: user.avatar } : defaultUserPhotoImg}
        alt="Imagem de perfil do usuário"
        size={16}
        margin={4}
      />
      */}
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  ) : (
    <Center backgroundColor="gray.600" paddingBottom={6} paddingTop={16}>
      <Heading color="gray.100" fontSize="xl" fontFamily="heading">
        {title}
      </Heading>
    </Center>
  )
}
