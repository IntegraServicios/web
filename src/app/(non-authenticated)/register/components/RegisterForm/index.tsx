'use client'

import { MrbPasswordStrength } from '@web/designSystem'
import { Button, Form, Input } from 'antd'

type Props = {
  isLoading: boolean
  onSubmit: (values: any) => void
}

export const RegisterForm = ({ isLoading, onSubmit }: Props) => {
  const [form] = Form.useForm()

  const handleSubmit = (values: any) => {
    onSubmit(values)
  }

  const password = Form.useWatch('password', form)

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      autoComplete="off"
      requiredMark={false}
    >
      <Form.Item
        label="Correo Electrónico"
        name="email"
        rules={[{ required: true, message: 'Correo electrónico es obligatorio' }]}
      >
        <Input type="email" placeholder="email" autoComplete="email" />
      </Form.Item>
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Nombre es obligatorio' }]}
        label="Nombre"
      >
        <Input placeholder="Tu nombre" />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ required: true, message: 'Apellído es obligatorio' }]}
        label="Apellído"
      >
        <Input placeholder="Tu apellído" />
      </Form.Item>

      <Form.Item
        name="role"
        rules={[{ required: true, message: 'El rol es obligatorio' }]}
        label="Rol"
      >
        <Input placeholder="ADMIN/STUDENT" />
      </Form.Item>

      <Form.Item
        label="Contraseña"
        name="password"
        rules={[{ required: true, message: 'Contraseña es obligatoria' }]}
      >
        <Input.Password
          type="password"
          placeholder="Tu contraseña"
          autoComplete="current-password"
        />
      </Form.Item>

      <MrbPasswordStrength value={password} className="mb-3" />

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Registrarse
        </Button>
      </Form.Item>
    </Form>
  )
}
