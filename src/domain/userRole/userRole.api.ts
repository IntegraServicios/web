import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { UserRole } from './userRole.model'

export class UserRoleApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<UserRole>,
  ): Promise<UserRole[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/userRoles${buildOptions}`)
  }

  static findOne(
    userRoleId: string,
    queryOptions?: ApiHelper.QueryOptions<UserRole>,
  ): Promise<UserRole> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/userRoles/${userRoleId}${buildOptions}`)
  }

  static createOne(values: Partial<UserRole>): Promise<UserRole> {
    return HttpService.api.post(`/v1/userRoles`, values)
  }

  static updateOne(
    userRoleId: string,
    values: Partial<UserRole>,
  ): Promise<UserRole> {
    return HttpService.api.patch(`/v1/userRoles/${userRoleId}`, values)
  }

  static deleteOne(userRoleId: string): Promise<void> {
    return HttpService.api.delete(`/v1/userRoles/${userRoleId}`)
  }
}
