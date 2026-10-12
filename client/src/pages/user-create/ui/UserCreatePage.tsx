import { UserForm } from '@/features/user-form'
import { ROUTES } from '@/shared/config'
import { BackButton, PageLayout } from '@/shared/ui'

export const UserCreatePage = () => (
  <PageLayout header={<BackButton to={ROUTES.users} />}>
    <UserForm />
  </PageLayout>
)
