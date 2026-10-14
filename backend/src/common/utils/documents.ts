import ExcelJS from 'exceljs'
import PDFDocument from 'pdfkit'

export interface DocumentSection {
  title: string
  columns?: string[]
  rows: string[][]
}

export interface DocumentContent {
  title: string
  subtitle: string
  sections: DocumentSection[]
}

const PAGE_BOTTOM = 770

export const createPdf = ({ title, subtitle, sections }: DocumentContent) =>
  new Promise<Buffer>((resolve) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 })
    const chunks: Buffer[] = []
    doc.on('data', (chunk: Buffer) => chunks.push(chunk))
    doc.on('end', () => resolve(Buffer.concat(chunks)))

    const width = doc.page.width - 100

    const writeRow = (cells: string[], bold = false) => {
      if (doc.y > PAGE_BOTTOM) doc.addPage()

      const y = doc.y
      const cellWidth = width / cells.length
      let bottom = y

      cells.forEach((cell, index) => {
        doc
          .font(bold ? 'Helvetica-Bold' : 'Helvetica')
          .text(cell, 50 + index * cellWidth, y, { width: cellWidth - 10 })
        bottom = Math.max(bottom, doc.y)
      })

      doc.y = bottom + 4
    }

    doc.font('Helvetica-Bold').fontSize(18).text(title)
    doc.font('Helvetica').fontSize(10).fillColor('#666666').text(subtitle)

    sections.forEach((section) => {
      doc.moveDown()
      doc.font('Helvetica-Bold').fontSize(12).fillColor('#B7862C').text(section.title, 50)
      doc.moveDown(0.4).fontSize(10).fillColor('#000000')

      if (section.columns) writeRow(section.columns, true)
      section.rows.forEach((row) => writeRow(row))
    })

    doc.end()
  })

export const createXlsx = async ({ title, subtitle, sections }: DocumentContent) => {
  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet('Hisobot')

  sheet.columns = [{ width: 36 }, { width: 24 }, { width: 24 }, { width: 24 }]
  sheet.addRow([title]).font = { bold: true, size: 14 }
  sheet.addRow([subtitle])

  sections.forEach((section) => {
    sheet.addRow([])
    sheet.addRow([section.title]).font = { bold: true, size: 12 }
    if (section.columns) sheet.addRow(section.columns).font = { bold: true }
    section.rows.forEach((row) => sheet.addRow(row))
  })

  return Buffer.from(await workbook.xlsx.writeBuffer())
}
