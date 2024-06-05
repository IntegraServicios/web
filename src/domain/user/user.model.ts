import { Notification } from '../notification'

import { Reservation } from '../reservation'

import { UserRoles } from '../userRoles'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: number
  email: string
  status: UserStatus
  name: string
  lastName: string
  role: string

  // pictureUrl: string
  password: string
  // dateCreated: string
  // dateUpdated: string
  notifications?: Notification[]

  reservations?: Reservation[]

  userRoless?: UserRoles[]

  pictureUrl?: string
}
