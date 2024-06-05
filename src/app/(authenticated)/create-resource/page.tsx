'use client'

import { useEffect, useState } from 'react'
import { Button, Form, Input, Select, Typography } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CreateResourcePage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id

  const [resourceTypes, setResourceTypes] = useState([])
  const [locations, setLocations] = useState([])
  const [capacities, setCapacities] = useState([])
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resourceTypesData = await Api.ResourceType.findAll()
        setResourceTypes(resourceTypesData)
      } catch (error) {
        enqueueSnackbar('Fallo al traer la data', { variant: 'error' })
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async values => {
    try {
      console.log("values:::::::")
      console.log(values)
      console.log("values:::::::")
      await Api.Resource.createNew(values)
      enqueueSnackbar('Recurso Creado con éxito', { variant: 'success' })
      router.push('/resources')
    } catch (error) {
      enqueueSnackbar(`Ocurrió un fallo: ${error.message}`, { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Crear Nuevo Recurso</Title>
      <Text type="secondary">
        Rellene los datos siguientes para añadir un nuevo recurso para reserva.
      </Text>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Nombre del Recurso"
          rules={[
            { required: true, message: 'Por favor ingreses el nombre del recurso!' },
          ]}
        >
          <Input placeholder="Digite el nombre del recurso" />
        </Form.Item>
        <Form.Item
          name="resourceTypeId"
          label="Tipo de Recurso"
          rules={[
            { required: true, message: 'Por favor seleccione un tipo de Recurso!' },
          ]}
        >
          <Select placeholder="Seleccione un tipo de recurso">
            {resourceTypes.map(type => (
              <Option key={type.id} value={type.id}>
                {type.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusCircleOutlined />}
          >
            Crear Recurso
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
