import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base'

import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png'
import { Input } from '@components/Input/Input'
import { Button } from '@components/Button/Button'
import { useNavigation } from '@react-navigation/native'

export function SignUp() {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack
        flex={1}
        backgroundColor="gray.700"
        paddingX={10}
        paddingBottom={16}
      >
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Descrição Imagem"
          resizeMode="contain"
          position="absolute"
        />

        <Center marginY={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Frase motivadora
          </Text>
        </Center>

        <Center>
          <Heading
            color="gray.100"
            fontSize="xl"
            marginBottom={6}
            fontFamily="heading"
          >
            Crie sua conta
          </Heading>

          <Input placeholder="Nome" />

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input placeholder="Senha" secureTextEntry />

          <Button title="Criar e acessar" />
        </Center>

        <Center marginTop={24}>
          <Button
            title="Voltar para o login"
            variant="outline"
            onPress={handleGoBack}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}
