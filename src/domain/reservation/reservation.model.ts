import { User } from '../user'

import { Resource } from '../resource'

import { ReservationStatus } from '../reservationStatus'

import { File } from '../file'

export class Reservation {
  id: number
  userId: number
  startAt: string
  endAt: string
  loanedAt: string
  returnedAt: string
  status: string
  createdAt: string
  updatedAt: string
  
}
