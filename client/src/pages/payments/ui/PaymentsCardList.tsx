import { ArrowRightOutlined, FileTextOutlined } from '@ant-design/icons'
import { Button, Card, Empty, Flex, Spin, Typography } from 'antd'
import { PaymentStatusTag, type Payment } from '@/entities/payment'
import { DownloadReceiptButton } from '@/features/payments-export'
import { formatDateTime, formatMoney } from '@/shared/lib/format'

interface PaymentsCardListProps {
  payments: Payment[]
  loading: boolean
  selectedId: number | null
  onOpen: (payment: Payment) => void
}

export const PaymentsCardList = ({
  payments,
  loading,
  selectedId,
  onOpen,
}: PaymentsCardListProps) => {
  if (!loading && payments.length === 0) {
    return <Empty className="py-10" description="Tanlangan filtrlar bo'yicha to'lovlar yo'q" />
  }

  return (
    <Spin spinning={loading}>
      <Flex vertical gap={12}>
        {payments.map((payment) => (
          <Card
            key={payment.id}
            size="small"
            className={payment.id === selectedId ? 'border-(--ant-color-primary)' : undefined}
          >
            <Flex justify="space-between" align="center" gap={8}>
              <Typography.Text strong>{payment.receiptNumber}</Typography.Text>
              <PaymentStatusTag status={payment.status} />
            </Flex>

            <Flex align="center" gap={6} className="mt-2 min-w-0">
              <Typography.Text type="secondary" ellipsis className="text-sm">
                {payment.payer}
              </Typography.Text>
              <ArrowRightOutlined className="shrink-0 text-xs text-(--ant-color-text-tertiary)" />
              <Typography.Text type="secondary" ellipsis className="text-sm">
                {payment.recipient}
              </Typography.Text>
            </Flex>

            <Flex justify="space-between" align="end" gap={8} className="mt-3">
              <Flex vertical>
                <Typography.Text strong className="text-lg">
                  {formatMoney(payment.amount)}
                </Typography.Text>
                <Typography.Text type="secondary" className="text-xs">
                  {formatDateTime(payment.createdAt)}
                </Typography.Text>
              </Flex>
              <Flex gap={8}>
                <Button icon={<FileTextOutlined />} onClick={() => onOpen(payment)}>
                  Chek
                </Button>
                <DownloadReceiptButton payment={payment} iconOnly />
              </Flex>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Spin>
  )
}
