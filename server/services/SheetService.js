const ExcelJS = require("exceljs")

function border(color) {
    return {
        left: { color: { argb: color }, style: "medium" },
        right: { color: { argb: color }, style: "medium" },
        top: { color: { argb: color }, style: "medium" },
        bottom: { color: { argb: color }, style: "medium" },
    }
}

function fillBorder(bgColor = null, bColor = null) {
    const style = {}

    if (bColor) {
        style.border = {
            top: { color: { argb: bColor }, style: "thin" },
            left: { color: { argb: bColor }, style: "thin" },
            bottom: { color: { argb: bColor }, style: "thin" },
            right: { color: { argb: bColor }, style: "thin" },
        }
    }

    if (bgColor) {
        style.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgColor} }
    }

    return style
}

function tableCellStyle(bgColor = 'FFFFFF'){
    return {
        alignment: { vertical: 'middle', horizontal: 'center' },
        ...fillBorder(bgColor, '111111'),
        font: { name: 'Arial', size: 7 }
    }
}

module.exports = {border, fillBorder, tableCellStyle}