'use client'
import { useEffect, useState } from 'react';
import { Typography, Table, Tag, Button, DatePicker, TimePicker, Space } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
const { Title, Paragraph } = Typography;
import { useAuthentication } from '@web/modules/authentication';
import dayjs, { Dayjs } from 'dayjs';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { Api, Model } from '@web/domain';
import { PageLayout } from '@web/layouts/Page.layout';
import { useCoreStore } from '@web/core/store';
import type { DatePickerProps } from 'antd';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';


export default function ResourceListPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const authentication = useAuthentication();
  const userId = authentication.user?.id;
  const store = useCoreStore();
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<[Dayjs, Dayjs] | null>(null);
  const [resources, setResources] = useState<Model.Resource[]>([]);

  const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    setSelectedDate(date);
  };

  const onTimeChange = (t: [Dayjs, Dayjs]) => {
    setTime(t);
  };

  


  const onBook = async (resourceId: string) => {
    if (selectedDate && time && time[0] && time[1]) {
      console.log(time[0].hour())
      console.log(time[1].hour())
      const startAt = selectedDate
        .set('hour', time[0].hour())
        .set('minute', time[0].minute())
        .set('second', time[0].second())
        .format('YYYY-MM-DDTHH:mm:ss')
      
      const endAt = selectedDate
        .set('hour', time[1].hour())
        .set('minute', time[1].minute())
        .set('second', time[1].second())
        .format('YYYY-MM-DDTHH:mm:ss')

      const result = {
        resourceId,
        startAt,
        endAt
      };
      try{
        await Api.Reservation.book(result)
        enqueueSnackbar('Reserva exitosa', { variant: 'success' });
      } catch(error){
        console.error(error)
        enqueueSnackbar(`Ocurrio un problema: ${error.message}`, { variant: 'error' });
      }
      
    } else {
      console.error('Please select both date and time range');
    }
  };

  const disabledHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      if (i < 6 || i > 18) {
        hours.push(i);
      }
    }
    return hours;
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const resourcesFound = await Api.Resource.getAll();
        let transformedData: any[] = [];
        resourcesFound.forEach((unit, unitIndex) => {
          unit.resourceTypes.forEach((type, typeIndex) => {
            const aux = type.resources.map((resource) => ({
              unitId: resourcesFound[unitIndex].id,
              unitName: resourcesFound[unitIndex].name,
              idType: unit.resourceTypes[typeIndex].id,
              type: unit.resourceTypes[typeIndex].name,
              description: unit.resourceTypes[typeIndex].description,
              id: resource.id,
              minReserve: unit.resourceTypes[typeIndex].minReserve,
              name: resource.name,
              schedule: unit.resourceTypes[typeIndex].schedule,
            }));
            if (aux.length !== 0) {
              transformedData.push(aux);
            }
          });
        });

        setResources(transformedData.flat());
      } catch (error) {
        enqueueSnackbar('Fallo al consultar los recursos', { variant: 'error' });
      }
    };

    fetchResources();
  }, []);

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'resourceName',
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'resourceType',
    },
    {
      title: 'Ubicación',
      dataIndex: 'unitName',
      key: 'location',
    },
    {
      title: 'Tiempo mínimo',
      dataIndex: 'minReserve',
      key: 'minReserve',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  if (store.isAdmin){
    columns.push(
      {
        title: 'Estado',
        key: 'status',
        render: (_, record) =>
          record.reservations?.some(
            (reservation) => reservation.status?.statusDescription === 'Booked'
          ) ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              Booked
            </Tag>
          ) : (
            <Tag color="success">
              Available
            </Tag>
          ),
      }
    )
  } else {
    columns.push({
      title: 'Disponibilidad',
      key: 'disponibility',
      render: (text, record) => (
        <div className="inline-form">
          <DatePicker onChange={onDateChange} className='width_pickers'/>
          <TimePicker.RangePicker
            value={time}
            format={'HH:mm'}
            minuteStep={30}
            disabledHours={disabledHours}
            onChange={onTimeChange}
            className='width_pickers'
          />
          <Button 
            type="primary" 
            block 
            onClick={() => onBook(record.id)}
          >
            Reservar
          </Button>
        </div>
      ),
    })
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Recursos disponibles</Title>
      <Paragraph>
        A continuación figura una lista de todos los recursos disponibles, como aulas y laboratorios,
        incluido su estado actual de reserva.
      </Paragraph>
      <Table dataSource={resources} columns={columns} rowKey="id" />
    </PageLayout>
  );
}
