'use client'

import { useEffect, useState } from 'react'
import {
  DatePicker,
  TimePicker,
  Button,
  Select,
  Typography,
  Form,
  Spin,
} from 'antd'
import { CalendarOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function BookResourcePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [resource, setResource] = useState(null)
  const [loading, setLoading] = useState(true)
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const resources = await Api.Resource.findMany({
          filters: { id: { eq: params.id } },
          includes: ['type', 'location', 'capacity'],
        })
        if (resources.length > 0) {
          setResource(resources[0])
        } else {
          enqueueSnackbar('Resource not found', { variant: 'error' })
          router.push('/resources')
        }
      } catch (error) {
        enqueueSnackbar('Failed to fetch resource', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchResource()
  }, [params.id, router])

  const handleFormSubmit = async values => {
    try {
      const { date, time } = values
      const startTime = dayjs(date)
        .hour(dayjs(time[0]).hour())
        .minute(dayjs(time[0]).minute())
      const endTime = dayjs(date)
        .hour(dayjs(time[1]).hour())
        .minute(dayjs(time[1]).minute())

      await Api.Reservation.createOneByUserId(userId, {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        resourceId: resource.id,
        statusId: 'pending', // Assuming 'pending' is a valid statusId
      })

      enqueueSnackbar('Reservation successfully created', {
        variant: 'success',
      })
      router.push('/my-reservations')
    } catch (error) {
      enqueueSnackbar('Failed to create reservation', { variant: 'error' })
    }
  }

  if (loading) {
    return <Spin size="large" />
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>
        <CalendarOutlined /> Book Resource
      </Title>
      <Text>Please fill out the form to book the resource.</Text>
      <Form form={form} onFinish={handleFormSubmit} layout="vertical">
        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: 'Please select a date' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="time"
          label="Time"
          rules={[{ required: true, message: 'Please select a time range' }]}
        >
          <TimePicker.RangePicker format="HH:mm" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
