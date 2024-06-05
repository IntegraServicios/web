import { ResourceType } from "../resourceType"
import { Schedule } from "../schedule"

export class Unit {
  id: string
  name: string
  resourceTypes: ResourceType[]
  schedule: Schedule
}