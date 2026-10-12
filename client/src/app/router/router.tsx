import { createBrowserRouter } from 'react-router'
import { GuestRoutes, PrivateRoutes } from '@/entities/session'
import { ErrorPage } from '@/pages/error'
import { ROUTES } from '@/shared/config'
import { FullPageLoader } from '@/shared/ui'
import { protectedRoutes } from './protectedRoutes'
import { RootRedirect } from './RootRedirect'

export const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <FullPageLoader />,
    children: [
      {
        element: <GuestRoutes />,
        children: [{ path: ROUTES.login, lazy: () => import('@/pages/login') }],
      },
      {
        element: <PrivateRoutes />,
        children: [
          { path: ROUTES.home, element: <RootRedirect /> },
          { path: ROUTES.noRoles, lazy: () => import('@/pages/no-roles') },
          {
            lazy: () => import('@/widgets/app-layout'),
            children: protectedRoutes.map(({ path, title, roles, lazy }) => ({
              element: <PrivateRoutes roles={roles} />,
              children: [{ path, lazy, handle: { title } }],
            })),
          },
        ],
      },
      { path: '*', lazy: () => import('@/pages/not-found') },
    ],
  },
])
