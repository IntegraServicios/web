import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { ResourceType as ResourceTypeModel } from './resourceType/resourceType.model'

import { Location as LocationModel } from './location/location.model'

import { Capacity as CapacityModel } from './capacity/capacity.model'

import { Resource as ResourceModel } from './resource/resource.model'

import { ReservationStatus as ReservationStatusModel } from './reservationStatus/reservationStatus.model'

import { Reservation as ReservationModel } from './reservation/reservation.model'

import { File as FileModel } from './file/file.model'

import { UserRole as UserRoleModel } from './userRole/userRole.model'

import { UserRoles as UserRolesModel } from './userRoles/userRoles.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class ResourceType extends ResourceTypeModel {}

  export class Location extends LocationModel {}

  export class Capacity extends CapacityModel {}

  export class Resource extends ResourceModel {}

  export class ReservationStatus extends ReservationStatusModel {}

  export class Reservation extends ReservationModel {}

  export class File extends FileModel {}

  export class UserRole extends UserRoleModel {}

  export class UserRoles extends UserRolesModel {}
}
