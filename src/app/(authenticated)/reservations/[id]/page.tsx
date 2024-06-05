'use client'

import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import { Descriptions, Space, Spin, Typography } from 'antd'
import dayjs from 'dayjs'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
const { Title, Text } = Typography

export default function ReservationDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()
  const [reservation, setReservation] = useState<Model.Reservation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!params.id) {
      enqueueSnackbar('Reservation ID is missing', { variant: 'error' })
      router.push('/my-reservations')
      return
    }

    const fetchReservation = async () => {
      try {
        const reservationData = await Api.Reservation.findOne(params.id, {
          includes: [
            'user',
            'resource',
            'status',
            'resource.type',
            'resource.location',
            'resource.capacity',
          ],
        })
        setReservation(reservationData)
      } catch (error) {
        enqueueSnackbar('Failed to fetch reservation details', {
          variant: 'error',
        })
        router.push('/my-reservations')
      } finally {
        setLoading(false)
      }
    }

    fetchReservation()
  }, [params.id, router])

  if (loading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  if (!reservation) {
    return (
      <PageLayout layout="narrow">
        <Text>No reservation found.</Text>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Detalles de la Reserva</Title>
      <Descriptions bordered>
        <Descriptions.Item label="Recurso" span={3}>
          {reservation.resource?.name || 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="Tipo" span={3}>
          {reservation.resource?.type?.typeName || 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="Ubicación" span={3}>
          <Space>
            <EnvironmentOutlined />
            {reservation.resource?.location?.locationName || 'N/A'}
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Capacidad" span={3}>
          {reservation.resource?.capacity?.numberOfSeats || 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="Tiempo inicio" span={3}>
          <Space>
            <ClockCircleOutlined />
            {dayjs(reservation.startTime).format('YYYY-MM-DD HH:mm')}
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Tiempo final" span={3}>
          <Space>
            <ClockCircleOutlined />
            {dayjs(reservation.endTime).format('YYYY-MM-DD HH:mm')}
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Reservado por:" span={3}>
          <Space>
            <UserOutlined />
            {reservation.user?.name || 'Anonymous'}
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Estado" span={3}>
          {reservation.status?.statusDescription || 'N/A'}
        </Descriptions.Item>
      </Descriptions>
      {/* <Button
        type="primary"
        onClick={() => router.push(`/reservations/${params.id}/upload`)}
      >
        Subir imagenes
      </Button> */}
    </PageLayout>
  )
}
