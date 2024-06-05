'use client'

import { useEffect, useState } from 'react'
import { Button, Upload, message, Typography } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function UploadFilesPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const { Title, Text } = Typography

  const [fileList, setFileList] = useState([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!authentication.isAuthenticated) {
      enqueueSnackbar('You must be logged in to access this page.', {
        variant: 'error',
      })
      router.push('/home')
    }
  }, [authentication.isAuthenticated, router])

  const handleUpload = async options => {
    const { file } = options
    setUploading(true)
    try {
      const url = await Api.Upload.upload(file)
      setFileList(currentList => [
        ...currentList,
        { url, name: file.name, status: 'done' },
      ])
      enqueueSnackbar('File uploaded successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Upload failed', { variant: 'error' })
    }
    setUploading(false)
  }

  const saveFiles = async () => {
    setUploading(true)
    try {
      await Promise.all(
        fileList.map(file =>
          Api.File.createOneByReservationId(params.id, {
            fileName: file.name,
            filePathUrl: file.url,
          }),
        ),
      )
      enqueueSnackbar('Files saved successfully', { variant: 'success' })
      router.push(`/reservations/${params.id}`)
    } catch (error) {
      enqueueSnackbar('Error saving files', { variant: 'error' })
    }
    setUploading(false)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Subir documentos requeridos para la reserva</Title>
      <Text>
        Por favor adjunte los documentos necesarios.
      </Text>
      <Upload
        fileList={fileList}
        customRequest={handleUpload}
        beforeUpload={() => false} // Prevent automatic upload
        multiple
      >
        <Button icon={<UploadOutlined />} disabled={uploading}>
          Seleccionar archivos
        </Button>
      </Upload>
      <Button
        type="primary"
        onClick={saveFiles}
        disabled={fileList.length === 0 || uploading}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Guardando...' : 'Guardar archivos'}
      </Button>
    </PageLayout>
  )
}
