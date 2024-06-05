import { HttpService } from '../../core/http'
import { User } from '../user'

interface RegisterResponse {
  name: string;
  lastName: string;
  email: string;
  role: string;
  id: number;
}

export class AuthenticationApi {

  static login(values: {
    email: string
    password: string
  }): Promise<{ token?: string }> {
    return HttpService.api.post(`/v1/authentication/login`, values)
  }

  static loginUser(values: {
    username: string
    password: string
  }): Promise<{ access_token?: string }> {
    return HttpService.api.post(`/auth/login`, values)
  } // nice

  static register(values: Partial<User>): Promise<{ token?: string }> {
    return HttpService.api.post(`/v1/authentication/register`, values)
  }

  static registerUser(values: Partial<User>): Promise<{ registerResponse: RegisterResponse }> { //nice
    return HttpService.api.put(`/user`, values)
  }

  static refresh(): Promise<{ token?: string }> {
    return HttpService.api.post(`/v1/authentication/refresh`)
  }

  static logout(document: Document): Promise<void> {
    return HttpService.api
      .post(`/v1/authentication/logout`)
      .catch(() => { })
      .then(() => {
        document.cookie =
          'APP_ACCESS_TOKEN= ; expires = Thu, 01 Jan 1970 00:00:00 GMT'
      })
  }

  static sendResetPassword(email: string): Promise<void> {
    return HttpService.api.post(`/v1/authentication/reset-password-email`, {
      email,
    })
  }

  static resetPassword(token: string, password: string): Promise<void> {
    return HttpService.api.patch(`/v1/authentication/reset-password`, {
      token,
      password,
    })
  }

  static googleCallback(values: {
    credential?: string
  }): Promise<{ token?: string }> {
    return HttpService.api.post(`/v1/authentication/google/callback`, {
      token: values.credential,
    })
  }
}
