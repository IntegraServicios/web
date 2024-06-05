import { Reservation } from '../reservation'

export class File {
  id: string

  fileName?: string

  filePathUrl?: string

  reservationId?: string

  reservation?: Reservation

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
