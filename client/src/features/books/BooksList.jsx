import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { useGetBooksQuery, useDeleteBookMutation } from './bookApiSlice';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AddBook from './AddBook';
import UpdateBook from './UpdateBook';
import { Dialog } from 'primereact/dialog';
import Login from '../auth/Login';
import { useSelector, useDispatch } from 'react-redux';

const categoryColors = {
    'תנ"ך ומפרשיו': '#A5D6A7',
    'מועדים': '#FFE0B2',
    'מחשבה': '#90CAF9',
    'מוסר': '#B2EBF2',
    'חסידות': '#E1BEE7',
    'הלכה': '#C5CAE9',
    'מפרשי הש"ס': '#D1C4E9',
    'תלמוד בבלי': '#DCEDC8',
    'תלמוד ירושלמי': '#F0F4C3',
    'משניות': '#FFECB3',
    'סידורים': '#F8BBD0',
    'שונות': '#E0E0E0',
    'קונקורדנציה, אנציקלופדיות ומילונים': '#D7CCC8'
};

const BooksList = () => {
    const { data: booksList = [], isLoading, isError, error, refetch } = useGetBooksQuery('', {});
    const [deleteBook] = useDeleteBookMutation();
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const { isUserLoggedIn } = useSelector((state) => state.auth);
    const dispatch = useDispatch();


    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(booksList);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Books");
        XLSX.writeFile(workbook, "books.xlsx");
    };

    const exportPdf = () => {
        const doc = new jsPDF();
        doc.text("רשימת ספרים", 14, 16);
        const tableColumn = ["קוד", "שם", "מחבר", "נושא", "קטגוריה", "תורם"];
        const tableRows = booksList.map(book => [
            book.code,
            book.name,
            book.author,
            book.subject,
            book.category,
            book.donor || "לא נתרם"
        ]);
        doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
        doc.save("ספרים.pdf");
    };

    const imageBodyTemplate = (rowData) => {
        if (!rowData.image) return <span>אין תמונה</span>;
        const imageUrl = `http://localhost:1234/uploads/${rowData.image}`;
        return (
            <img
                src={imageUrl}
                alt={rowData.name}
                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj4KICA8cGF0aCBkPSJNNTAsMEgweiIvPgogIDxwYXRoIGQ9Ik01MCwxMDBoNzV2LTUwaC03NXoiLz4KPC9zdmc+';
                    e.target.alt = 'תמונה לא זמינה';
                }}
            />
        );
    };

    const categoryBodyTemplate = (rowData) => {
        const color = categoryColors[rowData.category] || '#ccc';
        return <Tag value={rowData.category} style={{ backgroundColor: color, color: 'white' }} />;
    };

    const donorBodyTemplate = (rowData) => (
        rowData.donor ?
            <Tag value={`${rowData.donor}`} severity="success" style={{ backgroundColor: '#ffff', color: 'black' }} /> :
            <Tag value="לא נתרם" severity="secondary" style={{ backgroundColor: '#ffff', color: 'black' }} />
    );

    const handleDeleteClick = async (book) => {
        if (window.confirm(`האם אתה בטוח שברצונך למחוק את הספר "${book.name}"?`)) {
            try {
                await deleteBook(book._id).unwrap();
                refetch();
                alert('הספר נמחק בהצלחה');
            } catch (err) {
                console.error('Error deleting book:', err);
                alert('אירעה שגיאה במחיקת הספר');
            }
        }
    };

    if (isLoading) return <div style={{ textAlign: 'center', padding: '2rem' }}>טוען...</div>;
    if (isError) return <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>שגיאה: {error?.message || 'שגיאה לא ידועה'}</div>;

    return (
        <>
            <Dialog header="הוספת ספר חדש" visible={visibleAdd} onHide={() => setVisibleAdd(false)} modal style={{ width: '50vw', minWidth: '400px' }}>
                <AddBook onSuccess={() => { setVisibleAdd(false); refetch(); }} />
            </Dialog>

            <Dialog header="עדכון הספר" visible={!!selectedBook} onHide={() => setSelectedBook(null)} modal style={{ width: '50vw', minWidth: '400px' }}>
                <UpdateBook book={selectedBook} onSuccess={() => { setSelectedBook(null); refetch(); }} />
            </Dialog>

            <div className="card" style={{ padding: '1rem' }}>
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Button icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} tooltip="Excel" tooltipOptions={{ position: 'top' }} style={{ backgroundColor: '#c4a484', borderColor: '#c4a484', color: 'white' }} />
                        <Button icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} tooltip="PDF" tooltipOptions={{ position: 'top' }} style={{ backgroundColor: '#DEB887', borderColor: '#DEB887', color: 'white' }} />
                    </div>
                    <div>
                        {isUserLoggedIn && <Button icon="pi pi-plus" className="p-button-success" tooltip="הוספת ספר" onClick={() => setVisibleAdd(true)} tooltipOptions={{ position: 'left' }} style={{ backgroundColor: '#c4a484', borderColor: '#c4a484', color: 'white' }} />}
                    </div>
                </div>

                <DataTable value={booksList} paginator rows={10} dataKey="_id" filterDisplay="row" emptyMessage="לא נמצאו ספרים" responsiveLayout="scroll">
                    {isUserLoggedIn && <Column header="פעולות" body={(rowData) => (
                        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}>
                            {isUserLoggedIn && <Button icon="pi pi-pencil" className="p-button-warning" size="small" onClick={() => setSelectedBook(rowData)} tooltipOptions={{ position: 'top' }} tooltip="עריכה"  style={{ backgroundColor: '#DEB887', borderColor: '#DEB887', color: 'white' }} />}
                            {isUserLoggedIn && <Button icon="pi pi-trash" className="p-button-danger p-button-sm" size="small" onClick={() => handleDeleteClick(rowData)} tooltipOptions={{ position: 'top' }} tooltip="מחיקה" style={{ backgroundColor: '#c4a484', borderColor: '#c4a484', color: 'white' }} />}
                        </div>
                    )} style={{ width: '10%' }} />}
                    <Column field="donor" header="תורם" style={{ width: '10%' }} body={donorBodyTemplate} />
                    <Column field="image" header="תמונה" style={{ width: '10%' }} body={imageBodyTemplate} />
                    <Column field="subject" header="נושא" style={{ width: '15%' }} />
                    <Column field="category" header="קטגוריה" style={{ width: '15%' }} body={categoryBodyTemplate} filter filterPlaceholder="חפש" sortable />
                    <Column field="author" header="מחבר" style={{ width: '15%' }} filter filterPlaceholder="חפש" sortable />
                    <Column field="name" header="שם ספר" style={{ width: '15%' }} filter filterPlaceholder="חפש" sortable />
                    <Column field="code" header="קוד ספר" style={{ width: '10%' }} filter filterPlaceholder="חפש" sortable />
                </DataTable>
            </div>
            <Button
                icon="pi pi-refresh" className="p-button-secondary" tooltip="טען" tooltipOptions={{ position: 'top' }} style={{ backgroundColor: '#FFFF', borderColor: '#FFFF', color: 'BLACK' }} size="small" onClick={refetch}
            />
        </>
    );
};

export default BooksList;
