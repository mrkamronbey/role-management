import { createPdf, createXlsx, type DocumentContent } from '../../common/utils/documents.js'
import { formatDate } from '../../common/utils/format.js'
import type { Report } from './reports.mock.js'

const toContent = (report: Report): DocumentContent => ({
  title: report.title,
  subtitle: `${report.reportNumber} | ${report.period} | ${report.confidentiality}`,
  sections: [
    {
      title: "Umumiy ma'lumotlar",
      rows: [
        ['Hisobot raqami', report.reportNumber],
        ['Davr', `${report.periodStart} - ${report.periodEnd}`],
        ['Departament', report.department],
        ['Muallif', report.author],
        ['Tasdiqlagan', report.approvedBy ?? '-'],
        ['Tasdiqlangan sana', report.approvedAt ? formatDate(report.approvedAt) : '-'],
        ['Versiya', report.version],
        ['Maxfiylik', report.confidentiality],
      ],
    },
    {
      title: "Asosiy ko'rsatkichlar",
      columns: ["Ko'rsatkich", 'Qiymat', "O'zgarish"],
      rows: report.metrics.map((metric) => [metric.label, metric.value, metric.change]),
    },
    {
      title: 'Muhim jihatlar',
      rows: report.highlights.map((text) => [`- ${text}`]),
    },
    ...(report.table
      ? [{ title: report.table.title, columns: report.table.columns, rows: report.table.rows }]
      : []),
    {
      title: 'Tavsiyalar',
      rows: report.recommendations.map((text, index) => [`${index + 1}. ${text}`]),
    },
  ],
})

export const buildReportFile = (report: Report) =>
  report.format === 'XLSX' ? createXlsx(toContent(report)) : createPdf(toContent(report))
