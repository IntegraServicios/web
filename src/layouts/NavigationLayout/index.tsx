import { RouterObject } from '@web/core/router'
import { useDesignSystem } from '@web/designSystem'
import { Model } from '@web/domain'
import { useAuthentication } from '@web/modules/authentication'
import { Col, Layout, Row } from 'antd'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { Leftbar } from './components/Leftbar'
import { Logo } from './components/Logo'
import { SubNavigation } from './components/SubNavigation'
import { Topbar } from './components/Topbar/index.layout'
import { useCoreStore } from '@web/core/store'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const authentication = useAuthentication()
  const user = authentication?.user as Model.User
  const store = useCoreStore()

  const { isMobile } = useDesignSystem()

  const goTo = (url: string) => {
    router.push(url)
  }

  const goToUserPage = (url: string) => {
    router.push(url.replace(':id', user?.id))
  }

  const itemsLeftbar = []

  const itemsUser = []

  console.log(store.roles)
  console.log(user)

  const itemsTopbarAdmin = [
    {
      key: '/home',
      label: 'Home',
      onClick: () => goTo('/home'),
    },

    {
      key: '/resources',
      label: 'Recursos Disponibles',
      onClick: () => goTo('/resources'),
    },

    {
      key: '/my-reservations', //reservas
      label: 'Reservas',
      onClick: () => goTo('/my-reservations'), //reservas en general
    },

    {
      key: '/create-resource',
      label: 'Crear Recurso',
      onClick: () => goTo('/create-resource'),
    }
  ]

  const itemsTopbarStudent = [
    {
      key: '/home',
      label: 'Home',
      onClick: () => goTo('/home'),
    },

    {
      key: '/resources',
      label: 'Recursos Disponibles',
      onClick: () => goTo('/resources'),
    },

    {
      key: '/my-reservations',
      label: 'Mis Reservas',
      onClick: () => goTo('/my-reservations'),
    }
  ]

  const itemsSubNavigation = [
    {
      key: '/home',
      label: 'Home',
    },

    {
      key: '/resources',
      label: 'Recursos Disponibles',
    },

    {
      key: '/resources/:id',
      label: 'Detalles del Recurso',
    },

    {
      key: '/resources/:id/book',
      label: 'Book Resource',
    },

    {
      key: '/my-reservations',
      label: 'Mis reservas',
    },

    {
      key: '/create-resource',
      label: 'Crear Recurso',
    },

    {
      key: '/reservations/:id/upload',
      label: 'Subir archivos',
    },

    {
      key: '/reservations/:id',
      label: 'Detalles de la reserva',
    },
  ]

  const itemsMobile = [
    {
      key: 'profile',
      label: 'Perfil',
      onClick: () => goTo(RouterObject.route.PROFILE),
    },
    {
      key: 'notifications',
      label: 'Notifications',
      onClick: () => goTo(RouterObject.route.NOTIFICATIONS),
    },
    (store.isAdmin) ? itemsTopbarAdmin : itemsTopbarStudent,
    // ...itemsTopbar,
    ...itemsLeftbar,
  ]

  const isLeftbar = itemsLeftbar.length > 0 && !isMobile

  return (
    <>
      <Layout>
        <Row
          style={{
            height: '100vh',
            width: '100vw',
          }}
        >
          {isLeftbar && (
            <Col>
              <Leftbar
                items={itemsLeftbar}
                itemsUser={itemsUser}
                logo={<Logo className="m-2" />}
              />
            </Col>
          )}

          <Col
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Topbar
              isMobile={isMobile}
              items={(store.isAdmin) ? itemsTopbarAdmin : itemsTopbarStudent}
              itemsMobile={itemsMobile}
              logo={!isLeftbar && <Logo width={40} height={40} />}
            />

            <Col
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <SubNavigation items={itemsSubNavigation} />

              {children}
            </Col>
          </Col>
        </Row>
      </Layout>
    </>
  )
}
