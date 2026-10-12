import { useState, type ReactNode } from 'react'
import {
  AppstoreOutlined,
  BarChartOutlined,
  SearchOutlined,
  TeamOutlined,
  WalletOutlined,
} from '@ant-design/icons'
import { AutoComplete, Empty, Spin, Typography } from 'antd'
import { useNavigate } from 'react-router'
import { useDebouncedValue } from '@/shared/lib/hooks'
import { useGlobalSearch, type SearchGroupType } from '../model/useGlobalSearch'

const GROUP_ICONS: Record<SearchGroupType, ReactNode> = {
  pages: <AppstoreOutlined />,
  users: <TeamOutlined />,
  payments: <WalletOutlined />,
  reports: <BarChartOutlined />,
}

export const GlobalSearch = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const debouncedValue = useDebouncedValue(value, 300)
  const { hasQuery, groups, isSearching } = useGlobalSearch(debouncedValue)

  const options = groups.map((group) => ({
    label: (
      <Typography.Text type="secondary" className="text-xs font-medium uppercase">
        {group.title}
      </Typography.Text>
    ),
    options: group.items.map((item) => ({
      value: item.key,
      label: (
        <div className="flex items-center gap-3 py-1">
          <span className="text-base">{GROUP_ICONS[group.type]}</span>
          <div className="min-w-0">
            <div className="truncate">{item.title}</div>
            <Typography.Text type="secondary" className="block truncate text-xs">
              {item.description}
            </Typography.Text>
          </div>
        </div>
      ),
    })),
  }))

  const handleSelect = (key: string) => {
    const item = groups.flatMap((group) => group.items).find((searchItem) => searchItem.key === key)
    if (item) {
      navigate(item.path)
    }
    setValue('')
  }

  let notFoundContent = null
  if (hasQuery) {
    notFoundContent = isSearching ? (
      <div className="flex justify-center py-4">
        <Spin size="small" />
      </div>
    ) : (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Hech narsa topilmadi" />
    )
  }

  return (
    <AutoComplete
      value={value}
      options={options}
      onChange={setValue}
      onSelect={handleSelect}
      showSearch={{ filterOption: false }}
      notFoundContent={notFoundContent}
      prefix={<SearchOutlined />}
      placeholder="Qidirish..."
      allowClear
      popupMatchSelectWidth={360}
      className="me-2 w-full max-w-72"
    />
  )
}
