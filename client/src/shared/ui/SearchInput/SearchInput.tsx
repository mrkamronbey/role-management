import { useEffect, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { useDebouncedValue } from '../../lib/hooks'

interface SearchInputProps {
  value: string
  placeholder: string
  onSearch: (value: string) => void
  className?: string
}

export const SearchInput = ({
  value,
  placeholder,
  onSearch,
  className = 'w-64',
}: SearchInputProps) => {
  const [text, setText] = useState(value)
  const debouncedText = useDebouncedValue(text.trim())

  useEffect(() => {
    if (debouncedText !== value) {
      onSearch(debouncedText)
    }
  }, [debouncedText, value, onSearch])

  return (
    <Input
      allowClear
      prefix={<SearchOutlined />}
      placeholder={placeholder}
      value={text}
      onChange={(event) => setText(event.target.value)}
      className={className}
    />
  )
}
