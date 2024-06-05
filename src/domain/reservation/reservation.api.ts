import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Reservation } from './reservation.model'

interface StatusUpdated {
  generatedMaps: []
  raw: []
  affected: number
}
export class ReservationApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Reservation>,
  ): Promise<Reservation[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/reservations${buildOptions}`)
  }

  static findOne(
    reservationId: string,
    queryOptions?: ApiHelper.QueryOptions<Reservation>,
  ): Promise<Reservation> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/reservations/${reservationId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Reservation>): Promise<Reservation> {
    return HttpService.api.post(`/v1/reservations`, values)
  }

  static book(values: Partial<Reservation>): Promise<void> { //nice
    return HttpService.api.post(`/reservations`, values)
  }

  static updateStatus( //nice
    reservationId: number,
    values: Partial<Reservation>,
  ): Promise<StatusUpdated> {
    return HttpService.api.put(`/reservations/status/${reservationId}`, values)
  }

  static updateOne(
    reservationId: string,
    values: Partial<Reservation>,
  ): Promise<Reservation> {
    return HttpService.api.patch(`/v1/reservations/${reservationId}`, values)
  }

  static deleteOne(reservationId: string): Promise<void> {
    return HttpService.api.delete(`/v1/reservations/${reservationId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Reservation>,
  ): Promise<Reservation[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/reservations${buildOptions}`,
    )
  }

  static retrieveAll(): Promise<Reservation[]> {
    return HttpService.api.get(`/reservations/user`)
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Reservation>,
  ): Promise<Reservation> {
    return HttpService.api.post(`/v1/users/user/${userId}/reservations`, values)
  }

  static findManyByResourceId(
    resourceId: string,
    queryOptions?: ApiHelper.QueryOptions<Reservation>,
  ): Promise<Reservation[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/resources/resource/${resourceId}/reservations${buildOptions}`,
    )
  }

  static createOneByResourceId(
    resourceId: string,
    values: Partial<Reservation>,
  ): Promise<Reservation> {
    return HttpService.api.post(
      `/v1/resources/resource/${resourceId}/reservations`,
      values,
    )
  }

  static findManyByStatusId(
    statusId: string,
    queryOptions?: ApiHelper.QueryOptions<Reservation>,
  ): Promise<Reservation[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/reservationStatuss/status/${statusId}/reservations${buildOptions}`,
    )
  }

  static createOneByStatusId(
    statusId: string,
    values: Partial<Reservation>,
  ): Promise<Reservation> {
    return HttpService.api.post(
      `/v1/reservationStatuss/status/${statusId}/reservations`,
      values,
    )
  }
}
