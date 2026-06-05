const pageWidth = 595.28
const pageHeight = 841.89
const pageMargin = 48
const bodyColor: PdfColor = [23, 38, 74]
const headingColor: PdfColor = [7, 23, 71]
const accentColor: PdfColor = [8, 103, 242]

type PdfColor = [number, number, number]

type PdfLine = {
  color?: PdfColor
  fontSize?: number
  gapAfter?: number
  text: string
}

type PdfDrawLine = Required<Omit<PdfLine, 'gapAfter'>> & {
  x: number
  y: number
}

export type WorkerReportPdfMetric = {
  delta: string
  label: string
  unit: string
  value: string
}

export type WorkerReportPdfCountItem = {
  count: number
  label: string
  percent?: string
}

export type WorkerReportPdfTrendSeries = {
  label: string
  values: number[]
}

export type WorkerReportPdfData = {
  dateRangeLabel: string
  generatedAt: Date
  institutionStats: WorkerReportPdfCountItem[]
  metricCards: WorkerReportPdfMetric[]
  regionStats: WorkerReportPdfCountItem[]
  reportSummaryRows: string[]
  serviceLinks: WorkerReportPdfCountItem[]
  title: string
  trendLabels: string[]
  trendSeries: WorkerReportPdfTrendSeries[]
}

function formatGeneratedAt(date: Date) {
  return new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

function makeSectionTitle(text: string): PdfLine {
  return {
    color: accentColor,
    fontSize: 15,
    gapAfter: 6,
    text,
  }
}

function makeSpacer(gapAfter = 10): PdfLine {
  return {
    gapAfter,
    text: '',
  }
}

function buildReportLines(data: WorkerReportPdfData): PdfLine[] {
  const lines: PdfLine[] = [
    {
      color: headingColor,
      fontSize: 24,
      gapAfter: 10,
      text: data.title,
    },
    {
      fontSize: 11,
      gapAfter: 3,
      text: `기간: ${data.dateRangeLabel}`,
    },
    {
      fontSize: 11,
      gapAfter: 16,
      text: `생성일: ${formatGeneratedAt(data.generatedAt)}`,
    },
    makeSectionTitle('주요 지표'),
    ...data.metricCards.map((metric) => ({
      text: `${metric.label}: ${metric.value}${metric.unit} (전주 대비 ${metric.delta})`,
    })),
    makeSpacer(),
    makeSectionTitle('주간 리포트 요약'),
    ...data.reportSummaryRows.map((summary) => ({ text: `- ${summary}` })),
    makeSpacer(),
    makeSectionTitle('주간 상담 및 서비스 추이'),
    ...data.trendSeries.map((series) => ({
      text: `${series.label}: ${series.values
        .map((value, index) => `${data.trendLabels[index]} ${value}건`)
        .join(', ')}`,
    })),
    makeSpacer(),
    makeSectionTitle('서비스 연계 현황'),
    ...data.serviceLinks.map((service) => ({
      text: `${service.label}: ${service.count}건${
        service.percent ? ` (${service.percent})` : ''
      }`,
    })),
    makeSpacer(),
    makeSectionTitle('기관별 상담 건수'),
    ...data.institutionStats.map((institution) => ({
      text: `${institution.label}: ${institution.count}건`,
    })),
    makeSpacer(),
    makeSectionTitle('지역별 서비스 연계 건수'),
    ...data.regionStats.map((region) => ({
      text: `${region.label}: ${region.count}건`,
    })),
  ]

  return lines
}

function estimateTextWidth(text: string, fontSize: number) {
  return Array.from(text).reduce((width, character) => {
    if (character === ' ') {
      return width + fontSize * 0.32
    }

    if ((character.codePointAt(0) ?? 0) <= 0x7f) {
      return width + fontSize * 0.58
    }

    return width + fontSize
  }, 0)
}

function wrapText(text: string, maxWidth: number, fontSize: number) {
  if (!text) {
    return ['']
  }

  const lines: string[] = []
  let currentLine = ''

  Array.from(text).forEach((character) => {
    const nextLine = currentLine + character

    if (currentLine && estimateTextWidth(nextLine, fontSize) > maxWidth) {
      lines.push(currentLine.trimEnd())
      currentLine = character.trimStart()
      return
    }

    currentLine = nextLine
  })

  if (currentLine) {
    lines.push(currentLine.trimEnd())
  }

  return lines
}

function paginateLines(lines: PdfLine[]) {
  const pages: PdfDrawLine[][] = []
  let currentPage: PdfDrawLine[] = []
  let y = pageHeight - pageMargin
  const maxLineWidth = pageWidth - pageMargin * 2

  lines.forEach((line) => {
    const fontSize = line.fontSize ?? 11
    const color = line.color ?? bodyColor
    const wrappedLines = wrapText(line.text, maxLineWidth, fontSize)
    const lineHeight = fontSize * 1.48

    wrappedLines.forEach((wrappedLine) => {
      if (y - lineHeight < pageMargin) {
        pages.push(currentPage)
        currentPage = []
        y = pageHeight - pageMargin
      }

      if (wrappedLine) {
        currentPage.push({
          color,
          fontSize,
          text: wrappedLine,
          x: pageMargin,
          y,
        })
      }

      y -= lineHeight
    })

    y -= line.gapAfter ?? 4
  })

  if (currentPage.length > 0 || pages.length === 0) {
    pages.push(currentPage)
  }

  return pages
}

function toUtf16BeHex(text: string) {
  return Array.from(text)
    .map((character) => {
      const codePoint = character.codePointAt(0) ?? 0

      if (codePoint > 0xffff) {
        const high = Math.floor((codePoint - 0x10000) / 0x400) + 0xd800
        const low = ((codePoint - 0x10000) % 0x400) + 0xdc00

        return `${high.toString(16).padStart(4, '0')}${low
          .toString(16)
          .padStart(4, '0')}`
      }

      return codePoint.toString(16).padStart(4, '0')
    })
    .join('')
}

function formatColor(color: PdfColor) {
  return color.map((value) => (value / 255).toFixed(3)).join(' ')
}

function buildContentStream(lines: PdfDrawLine[]) {
  return lines
    .map(
      (line) => `BT
${formatColor(line.color)} rg
/F1 ${line.fontSize} Tf
${line.x.toFixed(2)} ${line.y.toFixed(2)} Td
<${toUtf16BeHex(line.text)}> Tj
ET`,
    )
    .join('\n')
}

function byteLength(value: string) {
  return new TextEncoder().encode(value).length
}

function buildPdfDocument(pages: PdfDrawLine[][]) {
  const objects: string[] = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '',
    '<< /Type /Font /Subtype /Type0 /BaseFont /HYGoThic-Medium /Encoding /UniKS-UCS2-H /DescendantFonts [4 0 R] >>',
    '<< /Type /Font /Subtype /CIDFontType0 /BaseFont /HYGoThic-Medium /CIDSystemInfo << /Registry (Adobe) /Ordering (Korea1) /Supplement 2 >> /FontDescriptor 5 0 R /DW 1000 >>',
    '<< /Type /FontDescriptor /FontName /HYGoThic-Medium /Flags 4 /FontBBox [-6 -145 1000 880] /ItalicAngle 0 /Ascent 880 /Descent -145 /CapHeight 720 /StemV 80 >>',
  ]
  const pageRefs: string[] = []

  pages.forEach((page) => {
    const stream = buildContentStream(page)
    const contentObjectNumber = objects.length + 1

    objects.push(`<< /Length ${byteLength(stream)} >>
stream
${stream}
endstream`)

    const pageObjectNumber = objects.length + 1

    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentObjectNumber} 0 R >>`,
    )
    pageRefs.push(`${pageObjectNumber} 0 R`)
  })

  objects[1] = `<< /Type /Pages /Kids [${pageRefs.join(' ')}] /Count ${pageRefs.length} >>`

  let document = '%PDF-1.7\n'
  const offsets = [0]

  objects.forEach((object, index) => {
    offsets.push(byteLength(document))
    document += `${index + 1} 0 obj\n${object}\nendobj\n`
  })

  const xrefOffset = byteLength(document)
  document += `xref
0 ${objects.length + 1}
0000000000 65535 f 
`

  offsets.slice(1).forEach((offset) => {
    document += `${offset.toString().padStart(10, '0')} 00000 n 
`
  })

  document += `trailer
<< /Size ${objects.length + 1} /Root 1 0 R >>
startxref
${xrefOffset}
%%EOF`

  return new TextEncoder().encode(document)
}

export function createWorkerReportPdf(data: WorkerReportPdfData) {
  return buildPdfDocument(paginateLines(buildReportLines(data)))
}

export function downloadPdfFile(pdfBytes: Uint8Array, fileName: string) {
  const pdfBuffer = new ArrayBuffer(pdfBytes.byteLength)

  new Uint8Array(pdfBuffer).set(pdfBytes)

  const blob = new Blob([pdfBuffer], { type: 'application/pdf' })
  const downloadUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = downloadUrl
  link.download = fileName
  link.rel = 'noopener'
  document.body.appendChild(link)
  link.click()
  link.remove()

  window.setTimeout(() => {
    URL.revokeObjectURL(downloadUrl)
  }, 0)
}
