import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { ResourceType } from './resourceType.model'

export class ResourceTypeApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<ResourceType>,
  ): Promise<ResourceType[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/resourceTypes${buildOptions}`)
  }

  static findAll(): Promise<ResourceType[]> {
    return HttpService.api.get(`/resources/types/1`)
  }

  static findOne(
    resourceTypeId: string,
    queryOptions?: ApiHelper.QueryOptions<ResourceType>,
  ): Promise<ResourceType> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/resourceTypes/${resourceTypeId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<ResourceType>): Promise<ResourceType> {
    return HttpService.api.post(`/v1/resourceTypes`, values)
  }

  static updateOne(
    resourceTypeId: string,
    values: Partial<ResourceType>,
  ): Promise<ResourceType> {
    return HttpService.api.patch(`/v1/resourceTypes/${resourceTypeId}`, values)
  }

  static deleteOne(resourceTypeId: string): Promise<void> {
    return HttpService.api.delete(`/v1/resourceTypes/${resourceTypeId}`)
  }
}
