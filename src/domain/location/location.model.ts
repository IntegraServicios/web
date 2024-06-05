import { Resource } from '../resource'

export class Location {
  id: string

  locationName?: string

  address?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  resources?: Resource[]
}
