import { useState } from 'react'
import { saveFile } from '../file'
import { useNotify } from './useNotify'

export const useDownload = () => {
  const notify = useNotify()
  const [loading, setLoading] = useState(false)

  const download = async (request: () => Promise<Blob>, fileName: string) => {
    setLoading(true)
    try {
      saveFile(await request(), fileName)
      notify.success('Fayl yuklab olindi')
    } catch (error) {
      notify.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { download, loading }
}
