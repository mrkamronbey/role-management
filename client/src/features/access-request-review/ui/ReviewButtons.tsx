import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import { Button, Flex } from 'antd'
import { useConfirm, useNotify } from '@/shared/lib/hooks'
import { useReviewAccessRequest } from '../api/useReviewAccessRequest'

export const ReviewButtons = ({ requestId }: { requestId: number }) => {
  const confirm = useConfirm()
  const notify = useNotify()
  const review = useReviewAccessRequest()
  const isThisRequest = review.isPending && review.variables?.id === requestId
  const isApproving = isThisRequest && review.variables?.approve === true
  const isRejecting = isThisRequest && review.variables?.approve === false

  const handleReview = async (approve: boolean) => {
    try {
      await review.mutateAsync({ id: requestId, approve })
      notify.success(approve ? 'Rol biriktirildi' : "So'rov rad etildi")
    } catch (error) {
      notify.error(error)
    }
  }

  const confirmReject = () =>
    confirm({
      danger: true,
      icon: <CloseCircleOutlined />,
      title: "So'rovni rad etish",
      description: "Xodimga rol berilmaydi. So'rov \"Ko'rib chiqilgan\" bo'limiga o'tadi.",
      okText: 'Rad etish',
      onOk: () => handleReview(false),
    })

  const confirmApprove = () =>
    confirm({
      icon: <CheckCircleOutlined />,
      title: "So'rovni tasdiqlash",
      description: "Xodimga shu rol darhol biriktiriladi va bo'lim uning menyusida paydo bo'ladi.",
      okText: 'Tasdiqlash',
      onOk: () => handleReview(true),
    })

  return (
    <Flex gap={8}>
      <Button
        danger
        icon={<CloseOutlined />}
        loading={isRejecting}
        disabled={isApproving}
        onClick={confirmReject}
      >
        Rad etish
      </Button>
      <Button
        type="primary"
        icon={<CheckOutlined />}
        loading={isApproving}
        disabled={isRejecting}
        onClick={confirmApprove}
      >
        Tasdiqlash
      </Button>
    </Flex>
  )
}
