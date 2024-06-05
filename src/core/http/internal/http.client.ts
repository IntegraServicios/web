import { HttpError } from '../http.error'

interface ConstructorOptions {
  baseUrl?: string
}

type Middleware = (
  response: Response,
  error?: HttpError,
) => void | Promise<void>

export class HttpClient {
  private baseUrl: string

  private middlewaresOnSuccess: Middleware[] = []
  private middlewaresOnError: Middleware[] = []

  private accessToken: string

  constructor(options?: ConstructorOptions) {
    this.baseUrl = options?.baseUrl
  }

  setBaseUrl(baseUrl: string): void {
    this.baseUrl = baseUrl
  }

  setAccessToken(token: string): void {
    this.accessToken = token
  }

  getRequestOptions(): RequestInit {
    const options: RequestInit = {
      // credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    if (this.accessToken) {
      options.headers['Authorization'] = `Bearer ${this.accessToken}`
    }

    return options
  }

  getRequestUploadOptions(): RequestInit {
    const options: RequestInit = {
      credentials: 'include',
      headers: {},
    }

    if (this.accessToken) {
      options.headers['Authorization'] = `Bearer ${this.accessToken}`
    }

    return options
  }

  async get<Type>(url: string): Promise<Type> {
    const requestOptions: RequestInit = {
      ...this.getRequestOptions(),
      method: 'GET',
    }

    return fetch(`${this.baseUrl}${url}`, requestOptions).then(response => {
      return this.handleResponse(response)
    })
  }

  async post<Type>(url: string, data: any = {}): Promise<Type> {
    const requestOptions: RequestInit = {
      ...this.getRequestOptions(),
      //modify headers directly
      method: 'POST',
      body: JSON.stringify(data),
    }
    console.log('within http client')
    console.log(this.baseUrl+url)

    return fetch(`${this.baseUrl}${url}`, requestOptions).then(response => {
      return this.handleResponse(response)
    })
  }

  async put<Type>(url: string, data: any = {}): Promise<Type> {
    const requestOptions: RequestInit = {
      ...this.getRequestOptions(),
      method: 'PUT',
      body: JSON.stringify(data),
    }

    return fetch(`${this.baseUrl}${url}`, requestOptions).then(response => {
      return this.handleResponse(response)
    })
  }

  async upload<Type>(url: string, data: FormData): Promise<Type> {
    const requestOptions: RequestInit = {
      ...this.getRequestUploadOptions(),
      method: 'POST',
      body: data,
    }

    return fetch(`${this.baseUrl}${url}`, requestOptions).then(response => {
      return this.handleResponse(response)
    })
  }

  async patch<Type>(url: string, data: any = {}): Promise<Type> {
    const requestOptions: RequestInit = {
      ...this.getRequestOptions(),
      method: 'PATCH',
      body: JSON.stringify(data),
    }

    return fetch(`${this.baseUrl}${url}`, requestOptions).then(response => {
      return this.handleResponse(response)
    })
  }

  async delete<Type>(url: string): Promise<Type> {
    const requestOptions: RequestInit = {
      ...this.getRequestOptions(),
      method: 'DELETE',
    }

    return fetch(`${this.baseUrl}${url}`, requestOptions).then(response => {
      return this.handleResponse(response)
    })
  }

  /* -------------------------------------------------------------------------- */
  /*                                  UTILITIES                                 */
  /* -------------------------------------------------------------------------- */

  addMiddlewareOnSuccess(...middlewares: Middleware[]): void {
    this.middlewaresOnSuccess.push(...middlewares)
  }

  addMiddlewareOnError(...middlewares: Middleware[]): void {
    this.middlewaresOnError.push(...middlewares)
  }

  private async handleResponse(response: Response) {

    if (response.ok && response.status != 204) {
      const data = await response.json() 
      await this.runMiddlewares(response, this.middlewaresOnSuccess)

      return data
    }
    else if(response.status == 204){
      await this.runMiddlewares(response, this.middlewaresOnSuccess)
      return {}
    } 
    else {
      const data = await response.json() 
      
      const error = new HttpError(response.status, data)

      await this.runMiddlewares(response, this.middlewaresOnError, error)
      console.log('error within http client')
      console.log(error)
      console.log('end')
      throw error
    }
  }

  private async runMiddlewares(
    response: Response,
    middlewares: Middleware[],
    error?: HttpError,
  ): Promise<void> {
    for (const middleware of middlewares) {
      try {
        await middleware(response, error)
      } catch (error) {
        // ignore
      }
    }
  }
}
