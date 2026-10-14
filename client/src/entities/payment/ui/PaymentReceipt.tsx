import type { ReactNode } from 'react'
import { CheckCircleFilled, ClockCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { Card, Descriptions, Divider, Flex, QRCode, Typography, theme } from 'antd'
import mbLogo from '@/shared/assets/mb-logo.svg'
import { formatDateTime, formatMoney } from '@/shared/lib/format'
import { getReceiptText } from '../lib/getReceiptText'
import { PAYMENT_STATUS_META } from '../model/status'
import type { Payment, PaymentStatus } from '../model/types'

const STATUS_ICONS: Record<PaymentStatus, ReactNode> = {
  SUCCESS: <CheckCircleFilled />,
  PENDING: <ClockCircleFilled />,
  FAILED: <CloseCircleFilled />,
}

const notch =
  'before:absolute before:top-1/2 before:-left-8 before:size-4 before:-translate-y-1/2 before:rounded-full before:bg-(--ant-color-bg-elevated) after:absolute after:top-1/2 after:-right-8 after:size-4 after:-translate-y-1/2 after:rounded-full after:bg-(--ant-color-bg-elevated)'

const ReceiptDivider = () => <Divider dashed className={`relative my-4! ${notch}`} />

const ReceiptRows = ({ items }: { items: { label: string; value: ReactNode }[] }) => (
  <Descriptions
    column={1}
    size="small"
    colon={false}
    styles={{ content: { justifyContent: 'flex-end', textAlign: 'right' } }}
    items={items.map((item) => ({ key: item.label, label: item.label, children: item.value }))}
  />
)

export const PaymentReceipt = ({ payment }: { payment: Payment }) => {
  const { token } = theme.useToken()
  const statusColors: Record<PaymentStatus, string> = {
    SUCCESS: token.colorSuccess,
    PENDING: token.colorWarning,
    FAILED: token.colorError,
  }
  const color = statusColors[payment.status]

  return (
    <Card variant="borderless" className="bg-(--ant-color-fill-alter)">
      <Flex align="center" gap={12}>
        <img src={mbLogo} alt="Logo" className="size-9" />
        <Flex vertical>
          <Typography.Text strong>To'lov cheki</Typography.Text>
          <Typography.Text type="secondary" className="text-xs">
            {payment.receiptNumber}
          </Typography.Text>
        </Flex>
      </Flex>

      <Flex vertical align="center" className="mt-6">
        <Typography.Text className="text-5xl" style={{ color }}>
          {STATUS_ICONS[payment.status]}
        </Typography.Text>
        <Typography.Text className="mt-2" style={{ color }}>
          {PAYMENT_STATUS_META[payment.status].label}
        </Typography.Text>
        <Typography.Title level={3} className="my-1">
          {formatMoney(payment.amount)}
        </Typography.Title>
        <Typography.Text type="secondary" className="text-xs">
          {formatDateTime(payment.createdAt)}
        </Typography.Text>
      </Flex>

      <ReceiptDivider />

      <ReceiptRows
        items={[
          { label: "To'lovchi", value: payment.payer },
          { label: "To'lovchi hisobi", value: payment.payerAccount },
          { label: 'Qabul qiluvchi', value: payment.recipient },
          { label: 'Qabul qiluvchi hisobi', value: payment.recipientAccount },
          { label: "To'lov maqsadi", value: payment.purpose },
          { label: "To'lov usuli", value: payment.method },
        ]}
      />

      <ReceiptDivider />

      <ReceiptRows
        items={[
          { label: 'Summa', value: formatMoney(payment.amount) },
          { label: 'Komissiya', value: formatMoney(payment.commission) },
          {
            label: 'Jami',
            value: <strong>{formatMoney(payment.amount + payment.commission)}</strong>,
          },
          { label: 'Valyuta', value: payment.currency },
        ]}
      />

      <ReceiptDivider />

      <ReceiptRows
        items={[
          { label: 'Chek raqami', value: payment.receiptNumber },
          {
            label: 'Tranzaksiya ID',
            value: <Typography.Text copyable>{payment.transactionId}</Typography.Text>,
          },
        ]}
      />

      <Flex vertical align="center" gap={8} className="mt-4">
        <QRCode value={getReceiptText(payment)} size={160} errorLevel="L" bordered={false} />
        <Typography.Text type="secondary" className="text-xs">
          Chekni tekshirish uchun skanerlang
        </Typography.Text>
      </Flex>
    </Card>
  )
}
