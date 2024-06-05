import { ResourceType } from '../resourceType'

import { Schedule } from '../schedule'

import { Location } from '../location'

import { Capacity } from '../capacity'

import { Reservation } from '../reservation'

export class Resource {

  unitId: number

  unitName: string

  idType: number

  type: string

  capacity?: string //from characteristics

  description?: string

  id: number

  minReserve: number

  name: string

  schedule: Schedule[]

}

  // typeId?: string

  // type?: ResourceType

  // locationId?: string

  // location?: Location

  // capacityId?: string

  // capacity?: Capacity

  // dateCreated: string

  // dateDeleted: string

  // dateUpdated: string

  // reservations?: Reservation[]
// }
