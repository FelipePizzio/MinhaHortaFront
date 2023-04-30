import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Input } from '@components/Input'
import { UserPhoto } from '@components/UserPhoto'
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from 'native-base'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

const PHOTO_SIZE = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(true)
  const [userPhoto, setUserPhoto] = useState(
    'https://github.com/FelipePizzio.png',
  )

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true)
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        selectionLimit: 1,
      })

      if (photoSelected.canceled) {
        return null
      }

      if (photoSelected.assets[0].uri) {
        setUserPhoto(photoSelected.assets[0].uri)
      }
    } catch (error) {
      console.log('handleUserPhotoSelect', error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <Header title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center marginTop={6} paddingX={10}>
          {photoIsLoading ? (
            <Skeleton
              width={PHOTO_SIZE}
              height={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={{ uri: userPhoto }}
              alt="Imagem de perfil do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              marginTop={2}
              marginBottom={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input placeholder="Nome" background="gray.600" />

          <Input placeholder="E-mail" isDisabled background="gray.600" />

          <Heading
            color="gray.200"
            fontSize="md"
            marginBottom={2}
            marginTop={12}
            alignSelf="flex-start"
          >
            Alterar senha
          </Heading>

          <Input
            backgroundColor="gray.600"
            placeholder="Senha antiga"
            secureTextEntry
          />

          <Input
            backgroundColor="gray.600"
            placeholder="Nova senha"
            secureTextEntry
          />

          <Input
            backgroundColor="gray.600"
            placeholder="Confirme a nova senha"
            secureTextEntry
          />

          <Button title="Atualizar" marginTop={4} />
        </Center>
      </ScrollView>
    </VStack>
  )
}
