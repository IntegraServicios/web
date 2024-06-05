'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Button, Space, Tag } from 'antd';
import { useAuthentication } from '@web/modules/authentication';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { Api, Model } from '@web/domain';
import { PageLayout } from '@web/layouts/Page.layout';
import { useCoreStore } from '@web/core/store';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

const { Title, Text } = Typography;

export default function MyReservationsPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const authentication = useAuthentication();
  const userId = authentication.user?.id;
  const [reservations, setReservations] = useState<Model.Reservation[]>([]);
  const store = useCoreStore();
  const isAdmin = store.isAdmin;
  dayjs.extend(utc);
  dayjs.extend(timezone);

  useEffect(() => {
    if (userId) {
      Api.Reservation.retrieveAll()
        .then(setReservations)
        .catch(() =>
          enqueueSnackbar('Hubo un fallo al listar las reservas', { variant: 'error' })
        );
    }
  }, [userId]);

  const updateStatus = async (id: number, status: string) => {
    try {
      await Api.Reservation.updateStatus(id, { status });
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === id ? { ...reservation, status } : reservation
        )
      );

      enqueueSnackbar('Estado de la reserva actualizado', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Ocurrió un fallo al cambiar el estado', { variant: 'error' });
    }
  };

  const handleStatusClick = (record: Model.Reservation) => {
    const currentStatus = record.status;
    let nextStatus = '';

    switch (currentStatus) {
      case 'PENDING':
        nextStatus = 'ON_LOAN';
        break;
      case 'ON_LOAN':
        nextStatus = 'RETURNED';
        break;
      case 'RETURNED':
        nextStatus = 'PENDING'; // or whatever the desired status transition is
        break;
      default:
        return;
    }

    updateStatus(record.id, nextStatus);
  };

  console.log("reservations#####")
  console.log(reservations)
  console.log("reservations#####")

  const columns = [
    {
      title: 'Recurso',
      dataIndex: 'name',
      key: 'resourceName',
    },
    store.isAdmin ? {
      title: 'Correo Estudiante',
      dataIndex: 'email',
      key: 'studentEmail',
    } : {},
    {
      title: 'Hora inicial',
      dataIndex: 'startAt',
      key: 'startTime',
      render: (text) => dayjs.utc(text).format('YYYY/MM/DD HH:mm'),
    },
    {
      title: 'Hora final',
      dataIndex: 'endAt',
      key: 'endTime',
      render: (text) => dayjs.utc(text).format('YYYY/MM/DD HH:mm'),
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Button
          type="link"
          onClick={() => isAdmin && handleStatusClick(record)}
          style={{ padding: 0 }}
        >
          <Tag color={status === 'RETURNED' ? 'green' : 'blue'}>{status}</Tag>
        </Button>
      ),
    },
    {
      title: 'Hora préstamo',
      dataIndex: 'loanedAt',
      key: 'loanedAt',
      render: (text) => (text ? dayjs.utc(text).format('YYYY/MM/DD HH:mm') : 'N/A'),
    },
    {
      title: 'Hora devolución',
      dataIndex: 'returnedAt',
      key: 'returnedAt',
      render: (text) => (text ? dayjs.utc(text).format('YYYY/MM/DD HH:mm') : 'N/A'),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            onClick={() => updateStatus(record.id, 'CANCELED')} 
            danger
            disabled={record.status == 'RETURNED' || record.status == 'CANCELED' ? true : false}
          >
            Cancel
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Reservaciones</Title>
      <Text>
        Aquí puede ver y gestionar todas sus reservas actuales y pasadas de recursos universitarios.
      </Text>
      <Table
        columns={columns}
        dataSource={reservations}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </PageLayout>
  );
}
