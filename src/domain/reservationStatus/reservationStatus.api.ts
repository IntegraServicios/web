import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { ReservationStatus } from './reservationStatus.model'

export class ReservationStatusApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<ReservationStatus>,
  ): Promise<ReservationStatus[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/reservationStatuss${buildOptions}`)
  }

  static findOne(
    reservationStatusId: string,
    queryOptions?: ApiHelper.QueryOptions<ReservationStatus>,
  ): Promise<ReservationStatus> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/reservationStatuss/${reservationStatusId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<ReservationStatus>,
  ): Promise<ReservationStatus> {
    return HttpService.api.post(`/v1/reservationStatuss`, values)
  }

  static updateOne(
    reservationStatusId: string,
    values: Partial<ReservationStatus>,
  ): Promise<ReservationStatus> {
    return HttpService.api.patch(
      `/v1/reservationStatuss/${reservationStatusId}`,
      values,
    )
  }

  static deleteOne(reservationStatusId: string): Promise<void> {
    return HttpService.api.delete(
      `/v1/reservationStatuss/${reservationStatusId}`,
    )
  }
}
