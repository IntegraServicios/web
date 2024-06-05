'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Card, Descriptions, Spin, Button } from 'antd'
import { EnvironmentOutlined, TeamOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ResourceDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()
  const [resource, setResource] = useState<Model.Resource | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const resourceData = await Api.Resource.findOne(params.id, {
          includes: ['location', 'capacity', 'reservations', 'type'],
        })
        setResource(resourceData)
      } catch (error) {
        enqueueSnackbar('Failed to fetch resource details.', {
          variant: 'error',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchResource()
  }, [params.id])

  const handleBack = () => {
    router.push('/resources')
  }

  if (loading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  if (!resource) {
    return (
      <PageLayout layout="narrow">
        <Text>Resource not found.</Text>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Resource Details</Title>
      <Card>
        <Descriptions title={resource.name} bordered>
          <Descriptions.Item label="Type">
            {resource.type?.typeName}
          </Descriptions.Item>
          <Descriptions.Item label="Location">
            <EnvironmentOutlined /> {resource.location?.locationName}
          </Descriptions.Item>
          <Descriptions.Item label="Capacity">
            <TeamOutlined /> {resource.capacity?.numberOfSeats} seats
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {resource.reservations?.length ? 'Reserved' : 'Available'}
          </Descriptions.Item>
          <Descriptions.Item label="Created">
            {dayjs(resource.dateCreated).format('DD MMM YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Last Updated">
            {dayjs(resource.dateUpdated).format('DD MMM YYYY')}
          </Descriptions.Item>
        </Descriptions>
        <Button
          type="primary"
          onClick={handleBack}
          style={{ marginTop: '20px' }}
        >
          Back to Resources
        </Button>
      </Card>
    </PageLayout>
  )
}
