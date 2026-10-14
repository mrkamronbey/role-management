import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Skeleton } from 'antd'
import { PrivateComponent } from '@/entities/session'
import { useUsersQuery, type User } from '@/entities/user'
import { UserFormModal } from '@/features/user-form'
import { ROLES } from '@/shared/config'
import { useIsMobile } from '@/shared/lib/hooks'
import {
  DataTable,
  DateRangeFilter,
  ErrorResult,
  PageCard,
  PaginationFooter,
  RefreshButton,
} from '@/shared/ui'
import { useUsersFilters } from '../model/useUsersFilters'
import { UsersCardList } from './UsersCardList'
import { getUsersColumns } from './usersColumns'
import { UsersFilters } from './UsersFilters'

export const UsersPage = () => {
  const isMobile = useIsMobile()
  const filters = useUsersFilters()
  const { search, role, from, to, page, limit } = filters
  const [modal, setModal] = useState<{ open: boolean; user?: User }>({ open: false })
  const { data, isPending, isFetching, isError, error, refetch } = useUsersQuery({
    search: search || undefined,
    role,
    from,
    to,
    page,
    limit,
  })

  const openCreate = () => setModal({ open: true })
  const openEdit = (user: User) => setModal({ open: true, user })
  const closeModal = () => setModal({ ...modal, open: false })

  let content
  if (isPending) {
    content = <Skeleton active paragraph={{ rows: 6 }} />
  } else if (isError) {
    content = <ErrorResult title="Ro'yxatni yuklab bo'lmadi" error={error} onRetry={refetch} />
  } else if (isMobile) {
    content = <UsersCardList users={data.items} loading={isFetching} onEdit={openEdit} />
  } else {
    content = (
      <DataTable
        columns={getUsersColumns(openEdit)}
        data={data.items}
        loading={isFetching}
        emptyText="Foydalanuvchilar topilmadi"
        startIndex={(page - 1) * limit}
      />
    )
  }

  return (
    <PageCard
      extra={
        <>
          <UsersFilters
            search={search}
            role={role}
            onSearch={filters.setSearch}
            onRoleChange={filters.setRole}
          />
          <DateRangeFilter from={from} to={to} onChange={filters.setPeriod} />
          <RefreshButton loading={isFetching} onClick={() => refetch()} />
          <PrivateComponent roles={[ROLES.ADMIN]}>
            <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
              {!isMobile && "Qo'shish"}
            </Button>
          </PrivateComponent>
        </>
      }
      footer={
        data &&
        data.total > 0 && (
          <PaginationFooter
            total={data.total}
            page={page}
            pageSize={limit}
            pageSizeOptions={filters.pageSizes}
            label="foydalanuvchi"
            onChange={filters.setPage}
            onPageSizeChange={filters.setLimit}
          />
        )
      }
    >
      {content}
      <UserFormModal open={modal.open} user={modal.user} onClose={closeModal} />
    </PageCard>
  )
}
