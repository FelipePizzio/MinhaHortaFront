import { HStack, Heading, Text, VStack, Icon } from 'native-base'
import { UserPhoto } from './UserPhoto'
import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

export function Header() {
  return (
    <HStack
      backgroundColor="gray.600"
      paddingTop={16}
      paddingBottom={5}
      paddingX={8}
      alignItems="center"
    >
      <UserPhoto
        source={{ uri: 'https://github.com/FelipePizzio.png' }}
        alt="Imagem de perfil do usuário"
        size={16}
        margin={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md">
          Fulano
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  )
}
