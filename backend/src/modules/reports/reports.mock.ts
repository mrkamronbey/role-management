const DAY = 24 * 60 * 60 * 1000
const MONTHS_COUNT = 8

const MONTH_NAMES = [
  'yanvar',
  'fevral',
  'mart',
  'aprel',
  'may',
  'iyun',
  'iyul',
  'avgust',
  'sentyabr',
  'oktyabr',
  'noyabr',
  'dekabr',
]

const decimal = (value: number) => value.toFixed(1).replace('.', ',')

const templates = [
  {
    title: 'Oylik moliyaviy hisobot',
    type: 'FINANCIAL',
    description: "Bankning oylik daromad, xarajat va sof foyda ko'rsatkichlari.",
    department: 'Moliya departamenti',
    author: 'D. Karimova',
    format: 'PDF',
    fileSizeKb: 2450,
    metrics: (month: number) => [
      { label: 'Sof foyda', value: `${decimal(184.2 - month * 6.3)} mlrd so'm` },
      { label: 'Daromadlar', value: `${decimal(612.5 - month * 14.8)} mlrd so'm` },
      { label: 'Xarajatlar', value: `${decimal(428.3 - month * 8.5)} mlrd so'm` },
    ],
  },
  {
    title: 'Operatsion faoliyat hisoboti',
    type: 'OPERATIONAL',
    description: "Filiallar faoliyati, xizmat ko'rsatish tezligi va mijozlar soni bo'yicha tahlil.",
    department: 'Operatsion departament',
    author: 'J. Toshmatov',
    format: 'XLSX',
    fileSizeKb: 860,
    metrics: (month: number) => [
      { label: 'Faol mijozlar', value: (1_248_600 - month * 9_400).toLocaleString('ru-RU') },
      { label: "O'rtacha xizmat vaqti", value: `${decimal(6.4 + month * 0.2)} daqiqa` },
      { label: 'Filiallar soni', value: String(42 - Math.floor(month / 3)) },
    ],
  },
  {
    title: 'Kredit risklari tahlili',
    type: 'RISK',
    description: "Kredit portfeli sifati va muammoli kreditlar ulushi bo'yicha baholash.",
    department: 'Risk-menejment departamenti',
    author: 'M. Yusupova',
    format: 'PDF',
    fileSizeKb: 1940,
    metrics: (month: number) => [
      { label: 'Kredit portfeli', value: `${decimal(18.4 - month * 0.3)} trln so'm` },
      { label: 'Muammoli kreditlar (NPL)', value: `${decimal(3.2 + month * 0.1)}%` },
      { label: 'Zaxiralar', value: `${decimal(612 - month * 11)} mlrd so'm` },
    ],
  },
  {
    title: 'AML muvofiqlik hisoboti',
    type: 'COMPLIANCE',
    description: "Shubhali operatsiyalar monitoringi va ularga ko'rilgan choralar.",
    department: 'Komplayens nazorati departamenti',
    author: 'S. Rahimov',
    format: 'PDF',
    fileSizeKb: 1320,
    metrics: (month: number) => [
      {
        label: 'Tekshirilgan operatsiyalar',
        value: (18_430 - month * 620).toLocaleString('ru-RU'),
      },
      { label: 'Shubhali deb topilgan', value: String(27 - month) },
      { label: 'Vakolatli organga yuborilgan', value: String(9 - Math.floor(month / 2)) },
    ],
  },
  {
    title: 'Likvidlik hisoboti',
    type: 'FINANCIAL',
    description: "Likvidlik koeffitsientlari va me'yoriy talablarga muvofiqlik.",
    department: "G'aznachilik departamenti",
    author: 'J. Toshmatov',
    format: 'PDF',
    fileSizeKb: 1780,
    metrics: (month: number) => [
      { label: 'Joriy likvidlik', value: `${decimal(42.6 - month * 0.8)}%` },
      { label: "Me'yor", value: '30%' },
      { label: 'Yuqori likvid aktivlar', value: `${decimal(3.1 - month * 0.05)} trln so'm` },
    ],
  },
]

export type ReportStatus = 'READY' | 'PROCESSING'

export const createMockReports = () => {
  const now = new Date()

  const reports = Array.from({ length: MONTHS_COUNT }, (_, month) => {
    const periodDate = new Date(now.getFullYear(), now.getMonth() - month, 1)
    const period = `${periodDate.getFullYear()}-yil ${MONTH_NAMES[periodDate.getMonth()]}`

    return templates.map(({ metrics, fileSizeKb, ...template }, index) => {
      const isProcessing = month === 0 && index % 2 === 0

      return {
        ...template,
        period,
        status: (isProcessing ? 'PROCESSING' : 'READY') as ReportStatus,
        fileSizeKb: isProcessing ? null : fileSizeKb + month * 37,
        metrics: isProcessing ? [] : metrics(month),
        createdAt: new Date(now.getTime() - (month * 30 + index) * DAY).toISOString(),
      }
    })
  }).flat()

  return reports.map((report, index) => ({
    id: index + 1,
    reportNumber: `HIS-${now.getFullYear()}-${String(index + 1).padStart(4, '0')}`,
    ...report,
  }))
}
