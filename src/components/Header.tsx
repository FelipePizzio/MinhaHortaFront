import { HStack, Heading, Text, VStack, Icon, Center } from 'native-base'
import { UserPhoto } from './UserPhoto'
import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

type Props = {
  isHome?: boolean
  title?: string
}

export function Header({ isHome, title }: Props) {
  return isHome ? (
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
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          Fulano
        </Heading>
      </VStack>

      <TouchableOpacity>
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
