'use client'
import { useConfiguration } from '@web/core/configuration'
import { Button, Flex, Form, Input } from 'antd'

type Props = {
  isLoading: boolean
  onSubmit: (values: { email: string; password: string }) => void
  onResetPassword: () => void
}

export const LoginForm = ({ isLoading, onSubmit, onResetPassword }: Props) => {
  const [form] = Form.useForm()

  const { isEnvironmentDevelopment } = useConfiguration()

  const handleSubmit = (values: { email: string; password: string }) => {
    onSubmit(values)
  }

  const initialValues = { email: null, password: null }

  if (isEnvironmentDevelopment) {
    initialValues.email = 'test@test.com'
    initialValues.password = 'password'
  }

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      initialValues={initialValues}
      requiredMark={false}
    >
      <Form.Item
        label="Correo Electrónico"
        name="username"
        rules={[{ required: true, message: 'El correo es obligatorio' }]}
      >
        <Input type="email" placeholder="email" autoComplete="email" />
      </Form.Item>

      <Form.Item
        label="Contraseña"
        name="password"
        rules={[{ required: true, message: 'La contraseña es obligatoria' }]}
      >
        <Input.Password
          type="password"
          placeholder="tu contraseña"
          autoComplete="current-password"
        />
      </Form.Item>

      <Form.Item>
        <Flex justify="end">
          {/* <Button
            type="link"
            onClick={onResetPassword}
            style={{ padding: 0, margin: 0 }}
          >
            Olvidaste tu contraseña?
          </Button> */}
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Iniciar sesión
        </Button>
      </Form.Item>
    </Form>
  )
}
