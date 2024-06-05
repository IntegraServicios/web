'use client'
import { RouterObject } from '@web/core/router'
import { useCoreStore } from '@web/core/store'
import { Api, Model } from '@web/domain'
import { AuthenticationHook } from '@web/domain/authentication'
import { useAuthentication } from '@web/modules/authentication'
import { GlobalService } from '@web/modules/global'
import { GoogleOauth } from '@web/modules/googleOauth'
import { GoogleButton } from '@web/modules/googleOauth/components/googleButton'
import { Button, Flex, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'
import { Header } from '../components/Header'
import { ErrorAlert } from './components/ErrorAlert'
import { RegisterForm } from './components/RegisterForm'

const { Text } = Typography

function base64urlDecode(str) {
  // Reemplaza caracteres específicos de base64url con los de base64 estándar
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  
  // Soluciona la longitud del string añadiendo padding
  while (str.length % 4) {
      str += '=';
  }
  
  // Decodifica de base64 a bytes
  const decodedStr = Buffer.from(str, 'base64').toString('utf8');
  
  return decodedStr;
}

function decodeJwtPayload(token) {
  // Divide el token en sus partes
  const parts = token.split('.');
  
  if (parts.length !== 3) {
      throw new Error('JWT inválido');
  }
  
  // La parte del payload es la segunda
  const payload = parts[1];
  
  // Decodifica el payload
  const decodedPayload = base64urlDecode(payload);
  
  // Parsea el payload JSON a un objeto
  return JSON.parse(decodedPayload);
}

export default function RegisterPage() {
  const router = useRouter()
  const store = useCoreStore()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const authenticationToken = AuthenticationHook.useToken()

  const {
    register,
    isLoading: isLoadingLogin,
    isSuccess: isSuccessLogin,
    errors: errorsLogin,
  } = AuthenticationHook.useRegister()

  const {
    googleCallback,
    isLoading: isLoadingGoogle,
    isSuccess: isSuccessGoogle,
    errors: errorsGoogle,
  } = AuthenticationHook.useGoogle()

  const isSuccess = isSuccessLogin || isSuccessGoogle
  const isLoading = isLoadingLogin || isLoadingGoogle || isSuccess
  const errors = [...errorsLogin, ...errorsGoogle]

  useEffect(() => {
    if (isSuccess) {
      onSuccess()
    }
  }, [isSuccess])

  const onError = () => {
    enqueueSnackbar('Could not register with Google', { variant: 'error' })
  }

  const onSuccess = async () => {
    try {
      // const user = await Api.User.findMe()

      // authentication.login(user)
      // const token = authenticationToken.getToken()

      // const user = decodeJwtPayload(token)

      const token = authenticationToken.getToken()
      const user = decodeJwtPayload(token)
      const role = {
        name: user.role
      }
      authentication.login(user)

      await GlobalService.initialiseStore({ store, role})

      router.push(RouterObject.route.HOME)
    } catch (error) {
      console.log(error)
      enqueueSnackbar('Algo salió mal con la inicialización', {
        variant: 'error',
      })
    }
  }

  /* -------------------------------- HANDLERS -------------------------------- */

  const handleSubmit = (values: Partial<Model.User>) => {
    register(values)
  }

  const handleGoogleSuccess = (response: { credential: string }) => {
    googleCallback(response)
  }

  return (
    <Flex align="center" justify="center" vertical flex={1}>
      <Flex
        vertical
        style={{ width: '340px', paddingBottom: '100px', paddingTop: '100px' }}
        gap="middle"
      >
        <Header description="Bienvenido!" />

        <ErrorAlert errors={errors} />

        <RegisterForm isLoading={isLoading} onSubmit={handleSubmit} />

        {GoogleOauth.useActive() && (
          <GoogleButton onSuccess={handleGoogleSuccess} onError={onError} />
        )}

        <Button
          ghost
          style={{ border: 'none' }}
          onClick={() => router.push(RouterObject.route.LOGIN)}
        >
          <Flex gap={'small'} justify="center">
            <Text type="secondary">Tienes una cuenta?</Text> <Text>Inicia sesión</Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  )
}
