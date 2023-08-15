const {getDates, dateFormat, isWeekend} = require("../functions/days")
const ExcelJS = require("exceljs")
const config = require("../config")
const date = require('date-and-time')
const {tableCellStyle} = require("./SheetService")
const fs = require('fs')
const {promisify} = require('bluebird')
const libre = require('libreoffice-convert')

class ReportService {
    prepareReport = async () => {
        const workbook = new ExcelJS.Workbook()
        await workbook.xlsx.readFile(config.paths.reportTemplate)
        return workbook
    }

    convertDays(days) {
        const currentYear = new Date().getFullYear()

        return days.reduce((result, next) => {
            const dayDate = date.parse(next.date, 'YYYY-MM-DD')
            const dayMonth = dayDate.getMonth() + 1
            const dayYear = dayDate.getFullYear()

            if (dayYear === currentYear) {
                if (!result[dayMonth]) {
                    result[dayMonth] = []
                }
                result[dayMonth].push(next)
            }
            return result
        }, {})
    }

    generateReport = async (days, company, authUser, months) => {
        this.workbook = await this.prepareReport()
        this.days = this.convertDays(days)

        this.company = company
        this.authUser = authUser
        this.months = months

        months.forEach(month => {
            this.setWorksheet(month)
        })

        const excelReportFileName = await this.saveExcelReport()
        return await this.savePDFReport(excelReportFileName)
    }

    setWorksheet = (dayMonth) => {
        const dayList = this.days[dayMonth]
        const monthSheet = this.workbook.worksheets[dayMonth - 1]

        monthSheet.getCell('C2').value = this.company.name
        monthSheet.getCell('C3').value = this.company.cif
        monthSheet.getCell('K2').value = this.company.code
        monthSheet.getCell('A7').value = this.company.law_text

        monthSheet.getCell('C4').value = this.authUser.name
        monthSheet.getCell('C5').value = this.authUser.nif
        monthSheet.getCell('I4').value = this.authUser.naf
        monthSheet.getCell('K4').value = this.authUser.contract_code

        try {
            monthSheet.mergeCells('A8:A9')
            monthSheet.mergeCells('B8:B9')
            monthSheet.mergeCells('C8:C9')
            monthSheet.mergeCells('D8:D9')
            monthSheet.mergeCells('E8:E9')
            monthSheet.mergeCells('F8:J8')
        } catch (e) {
            console.log(e.message)
        }

        monthSheet.getCell('A8').style = tableCellStyle('CCCCCC')
        monthSheet.getCell('A9').style = tableCellStyle('CCCCCC')
        monthSheet.getCell('B8').style = tableCellStyle('CCCCCC')
        monthSheet.getCell('B9').style = tableCellStyle('CCCCCC')
        monthSheet.getCell('C8').style = tableCellStyle('CCCCCC')
        monthSheet.getCell('C9').style = tableCellStyle('CCCCCC')
        monthSheet.getCell('D8').style = tableCellStyle('CCCCCC')
        monthSheet.getCell('D9').style = tableCellStyle('CCCCCC')
        monthSheet.getCell('E8').style = tableCellStyle('CCCCCC')
        monthSheet.getCell('E9').style = tableCellStyle('CCCCCC')

        monthSheet.getCell('F8').style = tableCellStyle('CCCCCC')
        monthSheet.getCell('F9').style = tableCellStyle('CCCCCC')
        monthSheet.getCell('G8').style = tableCellStyle('CCCCCC')
        monthSheet.getCell('G9').style = tableCellStyle('CCCCCC')
        monthSheet.getCell('H9').style = tableCellStyle('CCCCCC')
        monthSheet.getCell('I9').style = tableCellStyle('CCCCCC')
        monthSheet.getCell('J8').style = tableCellStyle('CCCCCC')
        monthSheet.getCell('J9').style = tableCellStyle('CCCCCC')

        monthSheet.getCell('A8').value = 'Dia'
        monthSheet.getCell('B8').value = 'Total horas\nordinarias'
        monthSheet.getCell('C8').value = 'Horas\ncom.'
        monthSheet.getCell('D8').value = 'H.\nextras'
        monthSheet.getCell('E8').value = 'H.\ncom.'
        monthSheet.getCell('F8').value = 'Horas ordinarias'
        monthSheet.getCell('F9').value = 'Entrada'
        monthSheet.getCell('G9').value = 'Salida'
        monthSheet.getCell('H9').value = 'Entrada'
        monthSheet.getCell('I9').value = 'Salida'
        monthSheet.getCell('J9').value = 'Diaria'

        const dates = getDates(dayMonth)

        let initialIndex = 10
        dates.forEach((d, i) => {
            const index = initialIndex + i
            const bgColor = d.weekend ? 'CCCCCC' : 'FFFFFF'

            monthSheet.getCell(`A${index}`).style = tableCellStyle(bgColor)
            monthSheet.getCell(`B${index}`).style = tableCellStyle(bgColor)
            monthSheet.getCell(`C${index}`).style = tableCellStyle(bgColor)
            monthSheet.getCell(`D${index}`).style = tableCellStyle(bgColor)
            monthSheet.getCell(`E${index}`).style = tableCellStyle(bgColor)
            monthSheet.getCell(`F${index}`).style = tableCellStyle(bgColor)
            monthSheet.getCell(`G${index}`).style = tableCellStyle(bgColor)
            monthSheet.getCell(`H${index}`).style = tableCellStyle(bgColor)
            monthSheet.getCell(`I${index}`).style = tableCellStyle(bgColor)
            monthSheet.getCell(`J${index}`).style = tableCellStyle(bgColor)

            monthSheet.getCell(`A${index}`).value = dateFormat(d.date)
            monthSheet.getCell(`B${index}`).value = !d.weekend ? '8h' : ''
            monthSheet.getCell(`C${index}`).value = ''
            monthSheet.getCell(`D${index}`).value = ''
            monthSheet.getCell(`E${index}`).value = ''
            monthSheet.getCell(`F${index}`).value = !d.weekend ? '8:00' : ''
            monthSheet.getCell(`G${index}`).value = !d.weekend ? '14:00' : ''
            monthSheet.getCell(`H${index}`).value = !d.weekend ? '16:00' : ''
            monthSheet.getCell(`I${index}`).value = !d.weekend ? '18:00' : ''
            monthSheet.getCell(`J${index}`).value = ''

            if (dayList && dayList.filter(day => {
                const dayDate = date.parse(day.date, 'YYYY-MM-DD')
                return d.date.getDate() === dayDate.getDate() && d.date.getMonth() === dayDate.getMonth() && d.date.getFullYear() === dayDate.getFullYear()
            }).length) {
                monthSheet.getCell(`J${index}`).value = 'Firmado'
            }
        })

        initialIndex = initialIndex + dates.length + 1
        monthSheet.getRow(initialIndex).height = 21
        monthSheet.getRow(initialIndex).values = ['Total', '168h', '', '', '', '', '', '', '', '']

        monthSheet.getCell(`A${initialIndex}`).style = tableCellStyle()
        monthSheet.getCell(`B${initialIndex}`).style = tableCellStyle()
        monthSheet.getCell(`C${initialIndex}`).style = tableCellStyle()
        monthSheet.getCell(`D${initialIndex}`).style = tableCellStyle()
        monthSheet.getCell(`E${initialIndex}`).style = tableCellStyle()
        monthSheet.getCell(`F${initialIndex}`).style = tableCellStyle()
        monthSheet.getCell(`G${initialIndex}`).style = tableCellStyle()
        monthSheet.getCell(`H${initialIndex}`).style = tableCellStyle()
        monthSheet.getCell(`I${initialIndex}`).style = tableCellStyle()
        monthSheet.getCell(`J${initialIndex}`).style = tableCellStyle()
        initialIndex = initialIndex + 2
        monthSheet.mergeCells(`A${initialIndex}:D${initialIndex}`)
        monthSheet.mergeCells(`E${initialIndex}:J${initialIndex}`)

        monthSheet.getCell(`A${initialIndex}`).style = tableCellStyle()
        monthSheet.getCell(`D${initialIndex}`).style = tableCellStyle()
        monthSheet.getCell(`J${initialIndex}`).style = tableCellStyle()

        monthSheet.getCell(`E${initialIndex}`).style = tableCellStyle()

        monthSheet.getCell(`A${initialIndex}`).value = 'Firma representante de la Empresa'
        monthSheet.getCell(`H${initialIndex}`).value = ' Firma trabajador/a'

    }

    saveExcelReport = async () => {
        for(let i = 0; i <= 11; i++) {
            if (!this.months.includes(i + 1)) {
                await this.workbook.removeWorksheet(`table_${(i + 1)}`)
            }
        }

        const fileName = 'report-' + Date.now() + '.xlsx'

        await this.workbook.xlsx.writeFile(config.paths.report + fileName)

        return fileName
    }

    savePDFReport = async (excelFileName) => {
        try {
            const excelFilePath = config.paths.report + excelFileName
            const pdfFileName = excelFileName.replace('.xlsx', '.pdf')
            const pdfFilePath = config.paths.report + pdfFileName
            const libreConvert = promisify(libre.convert)
            const data = await fs.promises.readFile(excelFilePath)
            const pdfFile = await libreConvert(data, '.pdf', undefined)
            await fs.promises.writeFile(pdfFilePath, pdfFile)

            return pdfFileName

        } catch (e) {
            console.log(e)
            return false
        }
    }
}

module.exports = new ReportService()