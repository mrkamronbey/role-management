import type { ReactNode } from 'react'
import { BulbOutlined, CheckCircleOutlined, FallOutlined, RiseOutlined } from '@ant-design/icons'
import {
  Alert,
  Card,
  Col,
  Descriptions,
  Divider,
  Flex,
  Row,
  Statistic,
  Table,
  Tag,
  Typography,
} from 'antd'
import mbLogo from '@/shared/assets/mb-logo.svg'
import { formatDate } from '@/shared/lib/format'
import { formatFileSize } from '../lib/formatFileSize'
import { REPORT_STATUS_META, REPORT_TYPE_LABELS } from '../model/labels'
import type { Report, ReportTable } from '../model/types'

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <>
    <Typography.Title level={5} className="mt-8 mb-3">
      {title}
    </Typography.Title>
    {children}
  </>
)

const DetailTable = ({ table }: { table: ReportTable }) => (
  <Table
    size="small"
    bordered
    pagination={false}
    scroll={{ x: 'max-content' }}
    columns={table.columns.map((title, index) => ({ title, dataIndex: index, key: index }))}
    dataSource={table.rows.map((row, index) => ({ ...row, key: index }))}
  />
)

const ListItem = ({ icon, text }: { icon: ReactNode; text: string }) => (
  <Flex gap={10} align="baseline">
    <span className="text-(--ant-color-primary)">{icon}</span>
    <Typography.Text>{text}</Typography.Text>
  </Flex>
)

export const ReportPreview = ({ report }: { report: Report }) => (
  <Flex justify="center" className="rounded-2xl bg-(--ant-color-fill-alter) p-4 sm:p-8">
    <Card className="w-full max-w-2xl shadow-sm" styles={{ body: { padding: 32 } }}>
      <Flex justify="space-between" align="center" gap={16}>
        <Flex align="center" gap={12}>
          <img src={mbLogo} alt="Logo" className="size-10" />
          <Typography.Text strong>Boshqaruv tizimi</Typography.Text>
        </Flex>
        <Flex vertical align="end" gap={4}>
          <Typography.Text type="secondary" className="text-xs">
            {report.reportNumber} · v{report.version}
          </Typography.Text>
          <Tag color={report.confidentiality === 'Maxfiy' ? 'red' : 'default'} className="me-0">
            {report.confidentiality}
          </Tag>
        </Flex>
      </Flex>

      <Divider />

      <Flex vertical align="center" className="mb-8 text-center">
        <Typography.Title level={3} className="mb-1">
          {report.title}
        </Typography.Title>
        <Typography.Text type="secondary">
          {report.period} ({formatDate(report.periodStart)} – {formatDate(report.periodEnd)})
        </Typography.Text>
      </Flex>

      <Descriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        items={[
          { label: 'Turi', children: REPORT_TYPE_LABELS[report.type] },
          { label: 'Holati', children: REPORT_STATUS_META[report.status].label },
          { label: "Bo'lim", children: report.department, span: 2 },
          { label: 'Muallif', children: report.author },
          {
            label: 'Format',
            children: report.fileSizeKb
              ? `${report.format}, ${formatFileSize(report.fileSizeKb)}`
              : report.format,
          },
        ]}
      />

      <Section title="Tavsif">
        <Typography.Paragraph className="m-0">{report.description}</Typography.Paragraph>
      </Section>

      {report.status === 'PROCESSING' ? (
        <Alert
          type="warning"
          showIcon
          className="mt-8"
          title="Hisobot tayyorlanmoqda, ko'rsatkichlar keyinroq paydo bo'ladi"
        />
      ) : (
        <>
          <Section title="Asosiy ko'rsatkichlar">
            <Row gutter={[12, 12]}>
              {report.metrics.map((metric) => (
                <Col key={metric.label} xs={24} sm={8}>
                  <Card size="small" className="h-full">
                    <Statistic
                      title={metric.label}
                      value={metric.value}
                      formatter={(value) => value}
                      styles={{ content: { fontSize: 18 } }}
                    />
                    <Typography.Text type="secondary" className="text-xs">
                      {metric.change.startsWith('-') ? <FallOutlined /> : <RiseOutlined />}{' '}
                      {metric.change} oyma-oy
                    </Typography.Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </Section>

          <Section title="Muhim jihatlar">
            <Flex vertical gap={8}>
              {report.highlights.map((text) => (
                <ListItem key={text} icon={<CheckCircleOutlined />} text={text} />
              ))}
            </Flex>
          </Section>

          {report.table && (
            <Section title={report.table.title}>
              <DetailTable table={report.table} />
            </Section>
          )}

          <Section title="Tavsiyalar">
            <Flex vertical gap={8}>
              {report.recommendations.map((text) => (
                <ListItem key={text} icon={<BulbOutlined />} text={text} />
              ))}
            </Flex>
          </Section>
        </>
      )}

      <Divider className="mt-10" />

      <Flex justify="space-between" align="end" gap={16} className="text-xs">
        <Flex vertical>
          <Typography.Text type="secondary">Tayyorladi</Typography.Text>
          <Typography.Text>
            {report.author}, {report.department}
          </Typography.Text>
        </Flex>
        <Flex vertical align="end" className="text-right">
          <Typography.Text type="secondary">Tasdiqladi</Typography.Text>
          <Typography.Text>{report.approvedBy ?? 'Tasdiqlanmagan'}</Typography.Text>
          {report.approvedAt && (
            <Typography.Text type="secondary">{formatDate(report.approvedAt)}</Typography.Text>
          )}
        </Flex>
      </Flex>
    </Card>
  </Flex>
)
