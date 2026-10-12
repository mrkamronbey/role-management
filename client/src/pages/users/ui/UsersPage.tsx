import { useState } from 'react'
import { Button, Pagination, Result, Skeleton, Typography } from 'antd'
import { useUsersQuery } from '@/entities/user'
import { getErrorMessage } from '@/shared/api'
import { useIsMobile } from '@/shared/lib/hooks'
import { USERS_PAGE_SIZE, useUsersFilters } from '../model/useUsersFilters'
import { UserInspector } from './UserInspector'
import { UsersCardList } from './UsersCardList'
import { usersColumns } from './usersColumns'
import { UsersToolbar } from './UsersToolbar'
import { DataTable, PageLayout } from '@/shared/ui'

export const UsersPage = () => {
  const isMobile = useIsMobile()
  const { search, role, page, setSearch, setRole, setPage } = useUsersFilters()
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const { data, isPending, isFetching, isError, error, refetch } = useUsersQuery({
    search: search || undefined,
    role,
    page,
    limit: USERS_PAGE_SIZE,
  })

  const selectedUser = data?.items.find((user) => user.id === selectedId)

  let content
  if (isPending) {
    content = <Skeleton active paragraph={{ rows: 6 }} />
  } else if (isError) {
    content = (
      <Result
        status="error"
        title="Ro'yxatni yuklab bo'lmadi"
        subTitle={getErrorMessage(error)}
        extra={<Button onClick={() => refetch()}>Qayta urinish</Button>}
      />
    )
  } else if (isMobile) {
    content = (
      <UsersCardList
        users={data.items}
        loading={isFetching}
        onSelect={(user) => setSelectedId(user.id)}
      />
    )
  } else {
    content = (
      <DataTable
        columns={usersColumns}
        data={data.items}
        loading={isFetching}
        emptyText="Foydalanuvchilar topilmadi"
        selectedId={selectedId}
        onRowClick={(user) => setSelectedId(user.id)}
      />
    )
  }

  const footer = data && data.total > 0 && (
    <div className="flex items-center justify-between gap-3">
      <Typography.Text type="secondary" className="hidden sm:inline">
        Jami: {data.total} ta foydalanuvchi
      </Typography.Text>
      <Pagination
        size="small"
        current={page}
        pageSize={USERS_PAGE_SIZE}
        total={data.total}
        showSizeChanger={false}
        onChange={setPage}
      />
    </div>
  )

  return (
    <PageLayout
      header={
        <UsersToolbar search={search} role={role} onSearch={setSearch} onRoleChange={setRole} />
      }
      footer={footer}
      inspector={
        selectedUser && <UserInspector user={selectedUser} onClose={() => setSelectedId(null)} />
      }
      onInspectorClose={() => setSelectedId(null)}
    >
      {content}
    </PageLayout>
  )
}
