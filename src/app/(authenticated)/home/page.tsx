'use client'

import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Typography, Space, Avatar } from 'antd'
import { UserOutlined, CalendarOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

export default function HomePage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const userStored = authentication.user
  const { enqueueSnackbar } = useSnackbar()
  const [reservations, setReservations] = useState([])

  dayjs.extend(utc);
  dayjs.extend(timezone);

  useEffect(() => {
    if (userId) {
      fetchReservations()
    }
  }, [userId])

  const fetchReservations = async () => {
    try {
      const reservationData = await Api.Reservation.retrieveAll()
      reservationData.sort((a, b) => {
        const dateA = dayjs(a.startAt);
        const dateB = dayjs(b.startAt);
        return dateA.diff(dayjs()) - dateB.diff(dayjs());
      });
      setReservations(reservationData.slice(0, 3))
    } catch (error) {
      enqueueSnackbar('Failed to fetch reservations', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title>Bienvenido a Integra Servicios</Title>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card
          title="Mi perfil"
          extra={
            <Avatar
              src={userStored?.pictureUrl || undefined}
              icon={<UserOutlined />}
            />
          }
        >
          <p>
            <strong>Nombre:</strong> {userStored?.name}
          </p>
          <p>
            <strong>Correo:</strong> {userStored?.email}
          </p>
          <p>
            <strong>Rol:</strong> {userStored?.role}
          </p>
        </Card>

        <Card title="Mis Reservas">
          {reservations?.map(reservation => (
            <Card
              type="inner"
              key={reservation.id}
              title={`Reserva: ${dayjs.utc(reservation.startAt).format('DD MMM YYYY HH:mm')}`}
              extra={
                <Button
                  type="link"
                  onClick={() => router.push(`/reservations/${reservation.id}`)}
                >
                  Detalles
                </Button>
              }
            >
              <p>
                <strong>Recurso:</strong> {reservation.resource?.name}
              </p>
              <p>
                <strong>Estado:</strong> {reservation.status}
              </p>
            </Card>
          ))}
        </Card>

        <Row gutter={16}>
          <Col span={12}>
            <Button
              type="primary"
              block
              icon={<CalendarOutlined />}
              onClick={() => router.push('/my-reservations')}
            >
              Ver todas las reservas
            </Button>
          </Col>
        </Row>
      </Space>
    </PageLayout>
  )
}
