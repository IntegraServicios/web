import { Reservation } from '../reservation'

export class ReservationStatus {
  id: string

  statusDescription?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  reservationsAsStatus?: Reservation[]
}
