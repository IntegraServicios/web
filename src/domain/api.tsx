import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { ResourceTypeApi } from './resourceType/resourceType.api'

import { LocationApi } from './location/location.api'

import { CapacityApi } from './capacity/capacity.api'

import { ResourceApi } from './resource/resource.api'

import { ReservationStatusApi } from './reservationStatus/reservationStatus.api'

import { ReservationApi } from './reservation/reservation.api'

import { FileApi } from './file/file.api'

import { UserRoleApi } from './userRole/userRole.api'

import { UserRolesApi } from './userRoles/userRoles.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class ResourceType extends ResourceTypeApi {}

  export class Location extends LocationApi {}

  export class Capacity extends CapacityApi {}

  export class Resource extends ResourceApi {}

  export class ReservationStatus extends ReservationStatusApi {}

  export class Reservation extends ReservationApi {}

  export class File extends FileApi {}

  export class UserRole extends UserRoleApi {}

  export class UserRoles extends UserRolesApi {}
}
