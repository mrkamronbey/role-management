import { Card, Skeleton } from 'antd'
import { useParams } from 'react-router'
import { useUserQuery } from '@/entities/user'
import { UserForm } from '@/features/user-form'
import { getErrorMessage } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import { BackButton, PageLayout, ResultPage } from '@/shared/ui'

export const UserEditPage = () => {
  const { id } = useParams()
  const { data: user, isPending, isError, error } = useUserQuery(Number(id))

  let content
  if (isError) {
    content = <ResultPage status="error" title={getErrorMessage(error)} />
  } else if (isPending) {
    content = (
      <Card className="max-w-3xl">
        <Skeleton active />
      </Card>
    )
  } else {
    content = <UserForm user={user} />
  }

  return <PageLayout header={<BackButton to={ROUTES.users} />}>{content}</PageLayout>
}
