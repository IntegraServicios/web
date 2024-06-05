import { HttpError } from '@web/core/http'
import { Api, Model } from '@web/domain'
import { useState } from 'react'
import { AuthenticationHook } from '../authentication.hook'
import Password from 'antd/es/input/Password'
import { log } from 'console'

interface Return {
  register: (values: Partial<Model.User>) => Promise<void>
  isLoading: boolean
  isSuccess: boolean
  errors: string[]
}

export const useAuthenticationRegister = (): Return => {
  const [isLoading, setLoading] = useState(false)
  const [isSuccess, setSuccess] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const authenticationToken = AuthenticationHook.useToken()

  const register = async (values: Partial<Model.User>) => {
    setLoading(true)

    setErrors([])

    try {
      authenticationToken.removeToken();
      const registerResponse  = await Api.Authentication.registerUser(values) // nice

      const loginData = {
        username: values.email as string,
        password: values.password
      }

      console.log('login data')
      console.log(loginData)
      const {access_token} = await Api.Authentication.loginUser(loginData) // nice

      console.log("Response from production api")
      console.log(registerResponse)
      console.log(access_token)
      console.log("#############")
      //after registrate, do a login to set the token
      authenticationToken.setToken(access_token)

      setSuccess(true)
    } catch (error) {
      console.log(error)
      const response = HttpError.getValidationMessages(error)

      if (response.statusCode === 500) {
        setErrors(['This email is not available'])
      } else {

        if (response.message == "role must be one of the following values: ADMIN, STUDENT") {
          setErrors(['El rol debe ser: ADMIN ó STUDENT'])
        } else {
          setErrors(['Algo salió mal'])
        }
      }
    }

    setLoading(false)
  }

  return {
    register,
    isLoading,
    isSuccess,
    errors,
  }
}
