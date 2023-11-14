import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Input } from '@components/Input'
import { Center, Heading, ScrollView, VStack } from 'native-base'

export function Profile() {
  return (
    <VStack flex={1}>
      <Header title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center marginTop={6} paddingX={10}>
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
