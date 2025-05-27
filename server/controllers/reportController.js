const Book = require("../models/Book")
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');


const categoryColors = {
    "תנך ומפרשיו": 'FFCCFF',
    "מועדים": 'FFFFCC',
    "מחשבה": 'CCFFFF',
    "מוסר": 'FFCCCC',
    "חסידות": 'CCFFCC',
    "הלכה": 'CCE5FF',
    "מפרשי השס": 'E0CCFF',
    "תלמוד בבלי": 'FFE0CC',
    "תלמוד ירושלמי": 'FFF2CC',
    "משניות": 'E2EFDA',
    "סידורים": 'D9EAD3',
    "שונות": 'F4CCCC',
    "קונקורדנציה, אנציקלופדיות ומילונים": 'D9D2E9'
};

const exportBooksToExcel = async (req, res) => {
    try {
        const books = await Book.find().sort({ category: 1 });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('ספרים');

        worksheet.columns = [
            { header: 'קוד ספר', key: '_id', width: 25 },
            { header: 'שם הספר', key: 'name', width: 30 },
            { header: 'מחבר', key: 'author', width: 25 },
            { header: 'קטגוריה', key: 'category', width: 25 },
            { header: 'נושא', key: 'subject', width: 30 }
        ];

        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).alignment = { horizontal: 'center' };
        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'A7BFDE' }
        };

        books.forEach((book, index) => {
            const row = worksheet.addRow({
                _id: book._id.toString(),
                name: book.name,
                author: book.author,
                category: book.category,
                subject: book.subject
            });

            const color = categoryColors[book.category] || 'FFFFFF';

            row.eachCell((cell) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: color }
                };
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });
        });

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=library.xlsx'
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('שגיאה ביצוא לאקסל:', error);
        res.status(500).send('אירעה שגיאה ביצירת הדו"ח');
    }
}
const exportBooksToPDF = (req, res) => {
    // Implement PDF export logic here
    res.send('Export to PDF not implemented yet');
}

module.exports = {
    exportBooksToExcel,
    exportBooksToPDF
}