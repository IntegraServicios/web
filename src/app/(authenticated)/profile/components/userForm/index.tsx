import { Model } from '@web/domain'
import { Button, Form, Input } from 'antd'
import React from 'react'

type Props = {
  user: Model.User
  isLoading: boolean
  isDisabled: boolean
  onSubmit: (user: Partial<Model.User>) => void
}

export const UserForm: React.FC<Props> = ({
  user,
  isLoading,
  isDisabled,
  onSubmit,
}: Props) => {
  const [form] = Form.useForm()

  const handleSubmit = (values: Partial<Model.User>) => {
    onSubmit(values)
  }

  const initialValues = {
    name: user?.name,
    email: user?.email
  }

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={handleSubmit}
      layout="vertical"
      requiredMark={false}
    >
      <Form.Item
        name= 'name'
        label="Nombre"
        rules={[{ required: true, message: 'El nombre es obligatorio' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Correo"
        name="email"
        rules={[{ required: true, message: 'El correo es obligatorio' }]}
      >
        <Input type="email" placeholder="Your email" autoComplete="email" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          disabled={isDisabled}
        >
          Guardar
        </Button>
      </Form.Item>
    </Form>
  )
}
