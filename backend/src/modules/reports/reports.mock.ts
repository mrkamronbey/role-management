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

const decimal = (value: number, digits = 1) => value.toFixed(digits).replace('.', ',')

const formatValue = (value: number, digits: number) =>
  digits > 0 ? decimal(value, digits) : Math.round(value).toLocaleString('ru-RU')

interface MetricDefinition {
  label: string
  unit: string
  digits: number
  value: (month: number) => number
}

const buildMetrics = (definitions: MetricDefinition[], month: number) =>
  definitions.map(({ label, unit, digits, value }) => {
    const current = value(month)
    const previous = value(month + 1)
    const change = previous ? ((current - previous) / previous) * 100 : 0

    return {
      label,
      value: `${formatValue(current, digits)}${unit}`,
      change: `${change >= 0 ? '+' : ''}${decimal(change)}%`,
    }
  })

interface ReportTemplate {
  title: string
  type: ReportType
  description: string
  department: string
  author: string
  approver: string
  confidentiality: string
  format: 'PDF' | 'XLSX'
  fileSizeKb: number
  metrics: MetricDefinition[]
  highlights: (month: number) => string[]
  recommendations: string[]
  table: {
    title: string
    columns: string[]
    rows: (month: number) => string[][]
  }
}

const INTERNAL = 'Ichki foydalanish uchun'
const CONFIDENTIAL = 'Maxfiy'

const income = (month: number) => 612.5 - month * 14.8
const expenses = (month: number) => 428.3 - month * 8.5

const templates: ReportTemplate[] = [
  {
    title: 'Oylik moliyaviy hisobot',
    type: 'FINANCIAL',
    description: "Bankning oylik daromad, xarajat va sof foyda ko'rsatkichlari.",
    department: 'Moliya departamenti',
    author: 'D. Karimova',
    approver: 'A. Qodirov, moliya departamenti direktori',
    confidentiality: INTERNAL,
    format: 'PDF',
    fileSizeKb: 2450,
    metrics: [
      { label: 'Sof foyda', unit: " mlrd so'm", digits: 1, value: (m) => 184.2 - m * 6.3 },
      { label: 'Daromadlar', unit: " mlrd so'm", digits: 1, value: income },
      { label: 'Xarajatlar', unit: " mlrd so'm", digits: 1, value: expenses },
    ],
    highlights: (month) => [
      `Daromadlarning ${62 - month}% qismi foizli daromadlardan tushgan`,
      `Xarajatlar daromadlarning ${Math.round((expenses(month) / income(month)) * 100)}% ini tashkil etdi`,
      `Kapital yetarliligi koeffitsienti ${decimal(17.8 - month * 0.1)}% (me'yor 13%)`,
    ],
    recommendations: [
      'Komissiya daromadlari ulushini oshirish uchun raqamli xizmatlarni kengaytirish',
      "Ma'muriy xarajatlarni choraklik byudjet doirasida nazorat qilish",
    ],
    table: {
      title: 'Daromad va xarajatlar tarkibi',
      columns: ['Modda', "Summa (mlrd so'm)", 'Ulushi'],
      rows: (month) => [
        ['Foizli daromadlar', decimal(income(month) * 0.62), '62%'],
        ['Komissiya daromadlari', decimal(income(month) * 0.24), '24%'],
        ['Boshqa daromadlar', decimal(income(month) * 0.14), '14%'],
        ['Xodimlar xarajatlari', decimal(expenses(month) * 0.41), '41%'],
        ["Ma'muriy xarajatlar", decimal(expenses(month) * 0.33), '33%'],
        ['Zaxiralarga ajratmalar', decimal(expenses(month) * 0.26), '26%'],
      ],
    },
  },
  {
    title: 'Operatsion faoliyat hisoboti',
    type: 'OPERATIONAL',
    description: "Filiallar faoliyati, xizmat ko'rsatish tezligi va mijozlar soni bo'yicha tahlil.",
    department: 'Operatsion departament',
    author: 'J. Toshmatov',
    approver: 'B. Ergashev, operatsion departament direktori',
    confidentiality: INTERNAL,
    format: 'XLSX',
    fileSizeKb: 860,
    metrics: [
      { label: 'Faol mijozlar', unit: '', digits: 0, value: (m) => 1_248_600 - m * 9_400 },
      { label: "O'rtacha xizmat vaqti", unit: ' daqiqa', digits: 1, value: (m) => 6.4 + m * 0.2 },
      { label: 'Filiallar soni', unit: '', digits: 0, value: (m) => 42 - Math.floor(m / 3) },
    ],
    highlights: (month) => [
      `Oy davomida ${(9_400 + month * 300).toLocaleString('ru-RU')} ta yangi mijoz qo'shildi`,
      "Toshkent shahridagi filiallarda xizmat vaqti eng qisqa bo'ldi",
      `Masofaviy kanallar orqali operatsiyalar ulushi ${71 - month}%`,
    ],
    recommendations: [
      "Navbat ko'p bo'lgan filiallarda qo'shimcha operator o'rinlarini ochish",
      'Mobil ilova orqali ochiladigan hisoblar sonini oshirish',
    ],
    table: {
      title: "Hududlar bo'yicha ko'rsatkichlar",
      columns: ['Hudud', 'Filiallar', 'Mijozlar', 'Xizmat vaqti (daq.)'],
      rows: (month) =>
        [
          ['Toshkent shahri', 12, 486_200, 5.1],
          ['Samarqand viloyati', 7, 182_400, 6.8],
          ["Farg'ona viloyati", 6, 164_900, 7.2],
          ['Buxoro viloyati', 5, 121_300, 6.9],
          ['Andijon viloyati', 5, 138_700, 7.5],
        ].map(([region, branches, clients, time]) => [
          String(region),
          String(branches),
          Math.round(Number(clients) - month * 1_500).toLocaleString('ru-RU'),
          decimal(Number(time) + month * 0.2),
        ]),
    },
  },
  {
    title: 'Kredit risklari tahlili',
    type: 'RISK',
    description: "Kredit portfeli sifati va muammoli kreditlar ulushi bo'yicha baholash.",
    department: 'Risk-menejment departamenti',
    author: 'M. Yusupova',
    approver: 'R. Nazarov, risk-menejment departamenti direktori',
    confidentiality: CONFIDENTIAL,
    format: 'PDF',
    fileSizeKb: 1940,
    metrics: [
      { label: 'Kredit portfeli', unit: " trln so'm", digits: 1, value: (m) => 18.4 - m * 0.3 },
      { label: 'Muammoli kreditlar (NPL)', unit: '%', digits: 1, value: (m) => 3.2 + m * 0.1 },
      { label: 'Zaxiralar', unit: " mlrd so'm", digits: 0, value: (m) => 612 - m * 11 },
    ],
    highlights: (month) => [
      `NPL darajasi ${decimal(3.2 + month * 0.1)}%, ichki limit (5%) doirasida`,
      "Eng yuqori risk qurilish tarmog'ida kuzatildi",
      `Zaxiralar muammoli kreditlarni ${decimal(1.6 - month * 0.02)} barobar qoplaydi`,
    ],
    recommendations: [
      "Qurilish tarmog'iga yangi kreditlar berishda garov talablarini kuchaytirish",
      "Muddati o'tgan kreditlar bo'yicha undiruv ishlarini tezlashtirish",
    ],
    table: {
      title: "Tarmoqlar bo'yicha kredit portfeli",
      columns: ['Tarmoq', 'Ulushi', 'NPL'],
      rows: (month) => [
        ['Sanoat', '28%', `${decimal(2.4 + month * 0.1)}%`],
        ['Savdo', '21%', `${decimal(3.1 + month * 0.1)}%`],
        ["Qishloq xo'jaligi", '17%', `${decimal(3.8 + month * 0.1)}%`],
        ['Qurilish', '12%', `${decimal(5.6 + month * 0.2)}%`],
        ['Jismoniy shaxslar', '22%', `${decimal(2.7 + month * 0.1)}%`],
      ],
    },
  },
  {
    title: 'AML muvofiqlik hisoboti',
    type: 'COMPLIANCE',
    description: "Shubhali operatsiyalar monitoringi va ularga ko'rilgan choralar.",
    department: 'Komplayens nazorati departamenti',
    author: 'S. Rahimov',
    approver: 'N. Aliyeva, komplayens nazorati departamenti direktori',
    confidentiality: CONFIDENTIAL,
    format: 'PDF',
    fileSizeKb: 1320,
    metrics: [
      { label: 'Tekshirilgan operatsiyalar', unit: '', digits: 0, value: (m) => 18_430 - m * 620 },
      { label: 'Shubhali deb topilgan', unit: '', digits: 0, value: (m) => 27 - m },
      {
        label: 'Vakolatli organga yuborilgan',
        unit: '',
        digits: 0,
        value: (m) => 9 - Math.floor(m / 2),
      },
    ],
    highlights: (month) => [
      `Shubhali operatsiyalarning ${44 - month}% qismi naqd pul bilan bog'liq`,
      'Barcha xabarlar qonunda belgilangan muddatda yuborildi',
      'Yangi mijozlarni tekshirish (KYC) jarayoni 100% bajarildi',
    ],
    recommendations: [
      "Bo'lib-bo'lib o'tkazmalarni aniqlash qoidalarini yangilash",
      "Filial xodimlari uchun AML bo'yicha choraklik o'quv o'tkazish",
    ],
    table: {
      title: 'Shubhali operatsiyalar turlari',
      columns: ['Operatsiya turi', 'Soni', 'Yuborilgan'],
      rows: (month) => [
        [
          'Naqd pul operatsiyalari',
          String(12 - Math.floor(month / 2)),
          String(4 - Math.floor(month / 3)),
        ],
        [
          "Xalqaro o'tkazmalar",
          String(7 - Math.floor(month / 3)),
          String(3 - Math.floor(month / 4)),
        ],
        ["Bo'lib-bo'lib o'tkazmalar", String(5 - Math.floor(month / 4)), '1'],
        ['Boshqalar', String(Math.max(3 - Math.floor(month / 3), 0)), '1'],
      ],
    },
  },
  {
    title: 'Likvidlik hisoboti',
    type: 'FINANCIAL',
    description: "Likvidlik koeffitsientlari va me'yoriy talablarga muvofiqlik.",
    department: "G'aznachilik departamenti",
    author: 'J. Toshmatov',
    approver: "K. Usmonov, g'aznachilik departamenti direktori",
    confidentiality: INTERNAL,
    format: 'PDF',
    fileSizeKb: 1780,
    metrics: [
      { label: 'Joriy likvidlik', unit: '%', digits: 1, value: (m) => 42.6 - m * 0.8 },
      {
        label: 'Qisqa muddatli likvidlik (LCR)',
        unit: '%',
        digits: 1,
        value: (m) => 128 - m * 1.5,
      },
      {
        label: 'Yuqori likvid aktivlar',
        unit: " trln so'm",
        digits: 2,
        value: (m) => 3.1 - m * 0.05,
      },
    ],
    highlights: (month) => [
      `Joriy likvidlik ${decimal(42.6 - month * 0.8)}%, me'yordan (30%) yuqori`,
      'Barcha likvidlik koeffitsientlari talablarga mos keladi',
      "Valyuta likvidligi bo'yicha zaxira yetarli darajada",
    ],
    recommendations: [
      "Ortiqcha likvidlikni qisqa muddatli davlat qimmatli qog'ozlariga joylashtirish",
      'Yirik depozitlar muddati tugashini haftalik monitoring qilish',
    ],
    table: {
      title: 'Likvidlik koeffitsientlari',
      columns: ['Koeffitsient', 'Qiymat', "Me'yor", 'Holat'],
      rows: (month) => [
        ['Joriy likvidlik', `${decimal(42.6 - month * 0.8)}%`, '30%', "Me'yorda"],
        ['LCR', `${decimal(128 - month * 1.5)}%`, '100%', "Me'yorda"],
        ['NSFR', `${decimal(114 - month * 0.6)}%`, '100%', "Me'yorda"],
      ],
    },
  },
]

export type ReportStatus = 'READY' | 'PROCESSING'

export const REPORT_TYPES = ['FINANCIAL', 'OPERATIONAL', 'RISK', 'COMPLIANCE'] as const

export type ReportType = (typeof REPORT_TYPES)[number]

const toDay = (date: Date) => date.toISOString().slice(0, 10)

export const createMockReports = () => {
  const now = new Date()

  const reports = Array.from({ length: MONTHS_COUNT }, (_, month) => {
    const periodDate = new Date(Date.UTC(now.getFullYear(), now.getMonth() - month, 1))
    const periodEnd = new Date(Date.UTC(now.getFullYear(), now.getMonth() - month + 1, 0))
    const period = `${periodDate.getUTCFullYear()}-yil ${MONTH_NAMES[periodDate.getUTCMonth()]}`
    const periodMonth = toDay(periodDate).slice(0, 7)

    return templates.map((template, index) => {
      const isProcessing = month === 0 && index % 2 === 0
      const createdAt = new Date(now.getTime() - (month * 30 + index) * DAY)

      return {
        title: template.title,
        type: template.type,
        description: template.description,
        department: template.department,
        author: template.author,
        confidentiality: template.confidentiality,
        format: template.format,
        period,
        periodMonth,
        periodStart: toDay(periodDate),
        periodEnd: toDay(periodEnd),
        version: month > 2 ? '1.1' : '1.0',
        status: (isProcessing ? 'PROCESSING' : 'READY') as ReportStatus,
        fileSizeKb: isProcessing ? null : template.fileSizeKb + month * 37,
        approvedBy: isProcessing ? null : template.approver,
        approvedAt: isProcessing ? null : new Date(createdAt.getTime() + 2 * DAY).toISOString(),
        metrics: isProcessing ? [] : buildMetrics(template.metrics, month),
        highlights: isProcessing ? [] : template.highlights(month),
        recommendations: isProcessing ? [] : template.recommendations,
        table: isProcessing
          ? null
          : {
              title: template.table.title,
              columns: template.table.columns,
              rows: template.table.rows(month),
            },
        createdAt: createdAt.toISOString(),
      }
    })
  }).flat()

  return reports.map((report, index) => ({
    id: index + 1,
    reportNumber: `HIS-${now.getFullYear()}-${String(index + 1).padStart(4, '0')}`,
    ...report,
  }))
}

export type Report = ReturnType<typeof createMockReports>[number]
