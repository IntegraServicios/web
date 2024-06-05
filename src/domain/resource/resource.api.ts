import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Resource } from './resource.model'
import {ResourceType} from '../resourceType/resourceType.model'
import { Unit } from '../unit'

export class ResourceApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Resource>,
  ): Promise<Resource[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/resources${buildOptions}`)
  }

  static getAll(): Promise<Unit[]> {
    return HttpService.api.get(`/resources`)
  }

  static findOne(
    resourceId: string,
    queryOptions?: ApiHelper.QueryOptions<Resource>,
  ): Promise<Resource> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/resources/${resourceId}${buildOptions}`)
  }

  static createOne(values: Partial<Resource>): Promise<Resource> {
    return HttpService.api.post(`/v1/resources`, values)
  }

  static updateOne(
    resourceId: string,
    values: Partial<Resource>,
  ): Promise<Resource> {
    return HttpService.api.patch(`/v1/resources/${resourceId}`, values)
  }

  static deleteOne(resourceId: string): Promise<void> {
    return HttpService.api.delete(`/v1/resources/${resourceId}`)
  }

  static findManyByTypeId(
    typeId: string,
    queryOptions?: ApiHelper.QueryOptions<Resource>,
  ): Promise<Resource[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/resourceTypes/type/${typeId}/resources${buildOptions}`,
    )
  }

  static createOneByTypeId(
    typeId: string,
    values: Partial<Resource>,
  ): Promise<Resource> {
    return HttpService.api.post(
      `/v1/resourceTypes/type/${typeId}/resources`,
      values,
    )
  }

  static createNew(
    values: {},
  ): Promise<Resource> {
    return HttpService.api.put(
      `/resources`,
      values,
    )
  }

  static findManyByLocationId(
    locationId: string,
    queryOptions?: ApiHelper.QueryOptions<Resource>,
  ): Promise<Resource[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/locations/location/${locationId}/resources${buildOptions}`,
    )
  }

  static createOneByLocationId(
    locationId: string,
    values: Partial<Resource>,
  ): Promise<Resource> {
    return HttpService.api.post(
      `/v1/locations/location/${locationId}/resources`,
      values,
    )
  }

  static findManyByCapacityId(
    capacityId: string,
    queryOptions?: ApiHelper.QueryOptions<Resource>,
  ): Promise<Resource[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/capacitys/capacity/${capacityId}/resources${buildOptions}`,
    )
  }

  static createOneByCapacityId(
    capacityId: string,
    values: Partial<Resource>,
  ): Promise<Resource> {
    return HttpService.api.post(
      `/v1/capacitys/capacity/${capacityId}/resources`,
      values,
    )
  }
}
