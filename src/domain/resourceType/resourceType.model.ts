import { Resource } from '../resource'
import { Schedule } from '../schedule'

export class ResourceType {
  id: string
  name: string
  description?: string
  minReserve: number
  resources: Resource[]
  schedule: Schedule
  updatedAt: string
  createdAt: string
  deletedAt?: string
}
