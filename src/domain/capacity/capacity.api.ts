import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Capacity } from './capacity.model'

export class CapacityApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Capacity>,
  ): Promise<Capacity[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/capacitys${buildOptions}`)
  }

  static findOne(
    capacityId: string,
    queryOptions?: ApiHelper.QueryOptions<Capacity>,
  ): Promise<Capacity> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/capacitys/${capacityId}${buildOptions}`)
  }

  static createOne(values: Partial<Capacity>): Promise<Capacity> {
    return HttpService.api.post(`/v1/capacitys`, values)
  }

  static updateOne(
    capacityId: string,
    values: Partial<Capacity>,
  ): Promise<Capacity> {
    return HttpService.api.patch(`/v1/capacitys/${capacityId}`, values)
  }

  static deleteOne(capacityId: string): Promise<void> {
    return HttpService.api.delete(`/v1/capacitys/${capacityId}`)
  }
}
