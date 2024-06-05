import { useCoreStore } from '@web/core/store'
import { Tag } from 'antd'
import React from 'react'

export const TabAdmin: React.FC = () => {
  const store = useCoreStore()

  return (
    <>
      {store.isAdmin && (
        <div>
          <Tag color="red">Empleado</Tag>
        </div>
      )}
    </>
  )
}
