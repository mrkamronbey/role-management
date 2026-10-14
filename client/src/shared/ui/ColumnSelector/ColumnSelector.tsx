import type { Key } from 'react'
import { MenuOutlined } from '@ant-design/icons'
import { Button, Checkbox, Popover, Tooltip, Tree, type TreeProps } from 'antd'
import { ColumnsIcon } from '../icons'

export interface ColumnSetting {
  key: string
  visible: boolean
}

interface ColumnSelectorProps {
  titles: Record<string, string>
  value: ColumnSetting[]
  defaultValue: ColumnSetting[]
  onChange: (columns: ColumnSetting[]) => void
}

export const ColumnSelector = ({ titles, value, defaultValue, onChange }: ColumnSelectorProps) => {
  const visibleCount = value.filter((column) => column.visible).length
  const allVisible = visibleCount === value.length

  const handleCheckAll = (checked: boolean) => {
    const defaultKeys = defaultValue.filter((column) => column.visible).map((column) => column.key)
    onChange(
      value.map((column) => ({
        ...column,
        visible: checked || defaultKeys.includes(column.key),
      })),
    )
  }

  const handleCheck = (checked: Key[] | { checked: Key[] }) => {
    const keys = Array.isArray(checked) ? checked : checked.checked
    if (keys.length > 0) {
      onChange(value.map((column) => ({ ...column, visible: keys.includes(column.key) })))
    }
  }

  const handleDrop: TreeProps['onDrop'] = ({ dragNode, node, dropPosition }) => {
    const targetIndex = value.findIndex((column) => column.key === node.key)
    const placeAfter = dropPosition > targetIndex
    const dragged = value.find((column) => column.key === dragNode.key)
    const rest = value.filter((column) => column.key !== dragNode.key)
    const insertIndex = rest.findIndex((column) => column.key === node.key) + (placeAfter ? 1 : 0)

    if (dragged) {
      rest.splice(insertIndex, 0, dragged)
      onChange(rest)
    }
  }

  const content = (
    <Tree
      checkable
      blockNode
      selectable={false}
      draggable={{ icon: <MenuOutlined /> }}
      styles={{ itemSwitcher: { display: 'none' } }}
      allowDrop={({ dropPosition }) => dropPosition !== 0}
      treeData={value.map((column) => ({ key: column.key, title: titles[column.key] }))}
      checkedKeys={value.filter((column) => column.visible).map((column) => column.key)}
      onCheck={handleCheck}
      onDrop={handleDrop}
    />
  )

  return (
    <Popover
      trigger="click"
      placement="bottomRight"
      title={
        <div className="flex items-center justify-between gap-6">
          <span>Ustunlar</span>
          <Checkbox
            checked={allVisible}
            indeterminate={!allVisible && visibleCount > 0}
            onChange={(event) => handleCheckAll(event.target.checked)}
          >
            Hammasi
          </Checkbox>
        </div>
      }
      content={content}
    >
      <Tooltip title="Ustunlarni tanlash">
        {' '}
        <Button aria-label="Ustunlarni tanlash" icon={<ColumnsIcon />} />
      </Tooltip>
    </Popover>
  )
}
