import { Heading, Icon, Image, ScrollView, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <VStack flex={1}>
      <VStack paddingX={8} backgroundColor="gray.600" paddingTop={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <Heading
          color="gray.200"
          marginLeft={1}
          textTransform="capitalize"
          flexShrink={1}
          fontFamily="heading"
        >
          Teste
        </Heading>
      </VStack>

      <ScrollView>
        <VStack padding={8}>
          <Image
            width="full"
            height="80"
            source={{
              uri: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.biologianet.com%2Fbiodiversidade%2Fcapivara.htm&psig=AOvVaw3_mskWluFpJXdAWf92SIuG&ust=1681736889571000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKjEi6G8rv4CFQAAAAAdAAAAABAE',
            }}
            alt="Imagem"
            marginBottom={3}
            resizeMode="cover"
            rounded="lg"
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}
