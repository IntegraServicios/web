import { Resource } from '../resource'

export class Capacity {
  id: string

  numberOfSeats?: number

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  resources?: Resource[]
}
