import { useCoreStore } from '@web/core/store'
import { MrbSplashScreen } from '@web/designSystem'
import { Api } from '@web/domain'
import { AuthenticationHook } from '@web/domain/authentication'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { RouterObject } from '../../core/router'
import { GlobalService } from '../global'
import { useAuthentication } from './authentication.context'

type Props = {
  children: ReactNode
  isPublic?: boolean
}

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


function AuthenticationGuard({ children, isPublic }: Props): ReactNode {
  const authentication = useAuthentication()
  const store = useCoreStore()
  const pathname = usePathname()
  const router = useRouter()

  const authenticationToken = AuthenticationHook.useToken()

  const [isLoading, setLoading] = useState(true)
  const [pathRedirected, setPathRedirected] = useState<string>()
  const [isRedirected, setRedirected] = useState(false)

  const handlePublic = async () => {
    if (authentication.isLoggedIn) {
      router.replace(RouterObject.route.HOME)

      setPathRedirected(RouterObject.route.HOME)

      return
    }

    setLoading(true)

    try {
      // const { token } = await Api.Authentication.refresh()

      const token = authenticationToken.getToken()

      const user = decodeJwtPayload(token)
      const role = {
        name: user.role
      }
      await GlobalService.initialiseStore({ store, role})

      console.log("here failed")
      authentication.login(user)
      console.log("confirm")

      router.replace(RouterObject.route.HOME)

      setPathRedirected(RouterObject.route.HOME)
    } catch (error) {
      authentication.logout()

      await GlobalService.cleanStore({ store })

      setRedirected(true)

      setLoading(false)
    }
  }

  const handleProtected = async () => {
    if (authentication.isLoggedIn) {
      setLoading(false)

      setRedirected(true)

      return
    }

    setLoading(true)

    try {
      const token = authenticationToken.getToken()

      const user = decodeJwtPayload(token)
      const role = {
        name: user.role
      }
      await GlobalService.initialiseStore({ store, role})

      console.log("here failed")
      authentication.login(user)
      console.log("confirm")

      setLoading(false)

      setRedirected(true)
    } catch (error) {
      authentication.logout()

      await GlobalService.cleanStore({ store })

      router.replace(RouterObject.route.LOGIN)

      setPathRedirected(RouterObject.route.LOGIN)
    }
  }

  useEffect(() => {
    if (isPublic) {
      handlePublic()
    } else {
      handleProtected()
    }
  }, [isPublic, authentication.isLoggedIn])

  useEffect(() => {
    if (!isLoading) {
      const isReady = pathname === pathRedirected

      if (isReady) {
        setRedirected(true)
      }
    }
  }, [isLoading, pathname])

  return (
    <>
      {isLoading || !isRedirected ? (
        <MrbSplashScreen name="integra servicios" />
      ) : (
        children
      )}
    </>
  )
}

export { AuthenticationGuard }
