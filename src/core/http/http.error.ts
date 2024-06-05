interface Data {
  code: number
  message: string
}

interface ResMessage {
  statusCode: number
  message: string
}
export class HttpError extends Error {
  public status: number
  public data: Data

  constructor(status: number, data: Data) {
    super(data.message ?? 'An HTTP error occured')

    this.name = 'HTTPError'
    this.data = data
    this.status = status
  }

  static getCode(error: Error): number {
    if (error instanceof HttpError) {
      return error.data.code
    }

    return -1
  }

  static getStatus(error: Error): number {
    if (error instanceof HttpError) {
      return error.status
    }

    return -1
  }

  static getValidationMessages(error: Error): ResMessage {
    const messages = (error?.['data'] ?? []) as ResMessage

    return messages
  }
}
