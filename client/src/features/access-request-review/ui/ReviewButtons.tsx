import { App, Button } from 'antd'
import { getErrorMessage } from '@/shared/api'
import { useReviewAccessRequest } from '../api/useReviewAccessRequest'

export const ReviewButtons = ({ requestId }: { requestId: number }) => {
  const { message } = App.useApp()
  const review = useReviewAccessRequest()
  const isThisRequest = review.isPending && review.variables?.id === requestId
  const isApproving = isThisRequest && review.variables?.approve === true
  const isRejecting = isThisRequest && review.variables?.approve === false

  const handleReview = async (approve: boolean) => {
    try {
      await review.mutateAsync({ id: requestId, approve })
      message.success(approve ? 'Rol biriktirildi' : "So'rov rad etildi")
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  return (
    <div className="flex gap-2">
      <Button onClick={() => handleReview(false)} loading={isRejecting} disabled={isApproving}>
        Rad etish
      </Button>
      <Button
        type="primary"
        onClick={() => handleReview(true)}
        loading={isApproving}
        disabled={isRejecting}
      >
        Tasdiqlash
      </Button>
    </div>
  )
}
