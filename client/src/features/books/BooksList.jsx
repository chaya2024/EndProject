import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { useGetBooksQuery, useDeleteBookMutation, useAddBookMutation } from './bookApiSlice';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useSelector } from 'react-redux';
import AddBook from './AddBook';
import { Dialog } from 'primereact/dialog';

const categoryColors = {
    'תנ"ך ומפרשיו': '#4CAF50',
    'מועדים': '#FF9800',
    'מחשבה': '#2196F3',
    'מוסר': '#00BCD4',
    'חסידות': '#9C27B0',
    'הלכה': '#3F51B5',
    'מפרשי הש"ס': '#673AB7',
    'תלמוד בבלי': '#8BC34A',
    'תלמוד ירושלמי': '#CDDC39',
    'משניות': '#FFC107',
    'סידורים': '#E91E63',
    'שונות': '#9E9E9E',
    'קונקורדנציה, אנציקלופדיות ומילונים': '#795548',
};

const BooksList = () => {
    const { data: booksList = [], isLoading, isSuccess, isError, error, refetch } = useGetBooksQuery('',
        {}
    );
    const [deleteBook] = useDeleteBookMutation()

    const categoryBodyTemplate = (rowData) => {
        const category = rowData.category;
        return (
            <Tag
                value={category}
                style={{
                    backgroundColor: categoryColors[category] || '#ccc',
                    color: 'white',
                }}
            />
        );
    };
    const [visibleAdd, setVisibleAdd] = useState(false);

    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(booksList);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Books");
        XLSX.writeFile(workbook, "books.xlsx");
    };

    const exportPdf = () => {
        const doc = new jsPDF();
        doc.text("Books List", 14, 16);
        const tableColumn = ["קוד", "שם", "מחבר", "נושא", "קטגוריה", "תורם"];
        const tableRows = booksList.map(book => [
            book.code,
            book.name,
            book.author,
            book.subject,
            book.category,
            book.donor ? 'כן' : 'לא'
        ]);
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });
        doc.save("books.pdf");
    };

    const imageBodyTemplate = (rowData) => {
        if (!rowData.image) return <span>אין תמונה</span>;
        
        const imageUrl = `http://localhost:1234/uploads/${rowData.image}`;
        
        return (
            <img 
                src={imageUrl}
                alt={rowData.name} 
                style={{ 
                    width: '50px', 
                    height: '50px', 
                    objectFit: 'cover',
                    borderRadius: '4px' 
                }}
                onError={(e) => {
                    console.error('Image failed to load:', imageUrl);
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNSAyMEMyNi4zODA3IDIwIDI3LjUgMTguODgwNyAyNy41IDE3LjVDMjcuNSAxNi4xMTkzIDI2LjM4MDcgMTUgMjUgMTVDMjMuNjE5MyAxNSAyMi41IDE2LjExOTMgMjIuNSAxNy41QzIyLjUgMTguODgwNyAyMy42MTkzIDIwIDI1IDIwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMzUgMzVIMTVMMjAgMjVMMjUgMzBMMzAgMjBMMzUgMzVaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=';
                    e.target.alt = 'תמונה לא זמינה';
                }}
            />
        );
    };

    const donorBodyTemplate = (rowData) =>
        rowData.donor ? <Tag value="נתרם" severity="success" /> : <Tag value="לא נתרם" severity="secondary" />;

    const handleDeleteClick = async (bookItem) => {
        if (window.confirm(`האם אתה בטוח שברצונך למחוק את הספר "${bookItem.name}"?`)) {
            try {
                await deleteBook(bookItem._id).unwrap();
                refetch();
                alert('הספר נמחק בהצלחה');
            } catch (error) {
                console.error('Error deleting book:', error);
                alert('אירעה שגיאה במחיקת הספר');
            }
        }
    }

    if (isLoading) return <div style={{ textAlign: 'center', padding: '2rem' }}>טוען...</div>;
    if (isError) return <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>שגיאה: {error?.message || 'שגיאה לא ידועה'}</div>;
    
    return (
        <>
            <Dialog
                header="הוספת ספר חדש"
                visible={visibleAdd}
                style={{ width: '50vw', minWidth: '400px' }}
                onHide={() => setVisibleAdd(false)}
                modal
            >
                <AddBook
                    onSuccess={() => {
                        setVisibleAdd(false);
                        refetch();
                    }}
                />
            </Dialog>
            <div className="card" style={{ padding: '1rem' }}>
                <h2>רשימת ספרים</h2>
                <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <Button
                        label="הוספת ספר"
                        icon="pi pi-plus"
                        className="p-button-success"
                        onClick={() => setVisibleAdd(true)}
                    />
                    <Button 
                        type="button" 
                        icon="pi pi-file-excel" 
                        severity="success" 
                        rounded 
                        onClick={exportExcel} 
                        tooltip="Export to Excel"
                    />
                    <Button 
                        type="button" 
                        icon="pi pi-file-pdf" 
                        severity="warning" 
                        rounded 
                        onClick={exportPdf} 
                        tooltip="Export to PDF"
                    />
                    <Button 
                        label="רענן" 
                        icon="pi pi-refresh" 
                        className="p-button-secondary" 
                        onClick={refetch} 
                    />
                </div>
                <DataTable 
                    value={booksList} 
                    loading={isLoading} 
                    paginator 
                    rows={10} 
                    dataKey="_id" 
                    filterDisplay="row"
                    emptyMessage="לא נמצאו ספרים"
                    responsiveLayout="scroll"
                >
                    <Column field="code" header="קוד ספר" filter filterPlaceholder="חפש לפי קוד" sortable />
                    <Column field="name" header="שם ספר" filter filterPlaceholder="חפש לפי שם ספר" sortable />
                    <Column field="author" header="מחבר" filter filterPlaceholder="חפש לפי מחבר" sortable />
                    <Column field="category" header="קטגוריה" body={categoryBodyTemplate} filter filterPlaceholder="חפש לפי קטגוריה" sortable />
                    <Column field="subject" header="נושא" />
                    <Column field="image" header="תמונה" body={imageBodyTemplate} />
                    <Column field="donor" header="תורם" body={donorBodyTemplate} />
                    <Column 
                        body={(rowData) => (
                            <Button 
                                label="מחק" 
                                icon="pi pi-trash" 
                                className="p-button-danger" 
                                size="small"
                                onClick={() => handleDeleteClick(rowData)} 
                            />
                        )} 
                        header="פעולות"
                    />
                </DataTable>
            </div>
        </>
    )
}
export default BooksList;