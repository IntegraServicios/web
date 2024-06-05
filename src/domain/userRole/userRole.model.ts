import { UserRoles } from '../userRoles'

export class UserRole {
  id: string

  roleDescription?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  userRolessAsRole?: UserRoles[]
}
