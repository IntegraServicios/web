import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { File } from './file.model'

export class FileApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<File>,
  ): Promise<File[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/files${buildOptions}`)
  }

  static findOne(
    fileId: string,
    queryOptions?: ApiHelper.QueryOptions<File>,
  ): Promise<File> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/files/${fileId}${buildOptions}`)
  }

  static createOne(values: Partial<File>): Promise<File> {
    return HttpService.api.post(`/v1/files`, values)
  }

  static updateOne(fileId: string, values: Partial<File>): Promise<File> {
    return HttpService.api.patch(`/v1/files/${fileId}`, values)
  }

  static deleteOne(fileId: string): Promise<void> {
    return HttpService.api.delete(`/v1/files/${fileId}`)
  }

  static findManyByReservationId(
    reservationId: string,
    queryOptions?: ApiHelper.QueryOptions<File>,
  ): Promise<File[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/reservations/reservation/${reservationId}/files${buildOptions}`,
    )
  }

  static createOneByReservationId(
    reservationId: string,
    values: Partial<File>,
  ): Promise<File> {
    return HttpService.api.post(
      `/v1/reservations/reservation/${reservationId}/files`,
      values,
    )
  }
}
