import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { UserRoles } from './userRoles.model'

export class UserRolesApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<UserRoles>,
  ): Promise<UserRoles[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/userRoless${buildOptions}`)
  }

  static findOne(
    userRolesId: string,
    queryOptions?: ApiHelper.QueryOptions<UserRoles>,
  ): Promise<UserRoles> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/userRoless/${userRolesId}${buildOptions}`)
  }

  static createOne(values: Partial<UserRoles>): Promise<UserRoles> {
    return HttpService.api.post(`/v1/userRoless`, values)
  }

  static updateOne(
    userRolesId: string,
    values: Partial<UserRoles>,
  ): Promise<UserRoles> {
    return HttpService.api.patch(`/v1/userRoless/${userRolesId}`, values)
  }

  static deleteOne(userRolesId: string): Promise<void> {
    return HttpService.api.delete(`/v1/userRoless/${userRolesId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<UserRoles>,
  ): Promise<UserRoles[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/userRoless${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<UserRoles>,
  ): Promise<UserRoles> {
    return HttpService.api.post(`/v1/users/user/${userId}/userRoless`, values)
  }

  static findManyByRoleId(
    roleId: string,
    queryOptions?: ApiHelper.QueryOptions<UserRoles>,
  ): Promise<UserRoles[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/userRoles/role/${roleId}/userRoless${buildOptions}`,
    )
  }

  static createOneByRoleId(
    roleId: string,
    values: Partial<UserRoles>,
  ): Promise<UserRoles> {
    return HttpService.api.post(
      `/v1/userRoles/role/${roleId}/userRoless`,
      values,
    )
  }
}
