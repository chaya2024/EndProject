import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useGetBookNeededQuery, useDeleteBookNeededMutation } from './neededApiSlice';
import AddBookNeeded from './AddNeeded';
import UpdateBookNeeded from './UpdateNeeded';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const BookNeededList = () => {
  const { data: bookNeededList = [], isLoading, isError, error, refetch } = useGetBookNeededQuery();
  const [deleteBookNeeded] = useDeleteBookNeededMutation();
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(bookNeededList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Donors');
    XLSX.writeFile(workbook, 'bookNeeded.xlsx');
  };

  const exportPdf = () => {
    const doc = new jsPDF();
    doc.text('רשימת ספרים דרושים', 14, 16);
    const tableColumn = ['שם', 'מחבר', 'מחיר'];
    const tableRows = bookNeededList.map((bookNeeded) => [
      bookNeeded.name,
      bookNeeded.author,
      bookNeeded.price
    ]);
    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
    doc.save('ספרים דרושים.pdf');
  };

  const handleDeleteClick = async (bookNeeded) => {
    if (window.confirm(`האם למחוק את הספר "${bookNeeded.name}"?`)) {
      try {
        await deleteBookNeeded(bookNeeded._id).unwrap();
        refetch();
        alert('הספר נמחק בהצלחה');
      } catch (err) {
        console.error('שגיאה במחיקה:', err);
        alert('אירעה שגיאה במחיקת הספר הדרוש');
      }
    }
  };

  const priceFilterTemplate = (options) => {
    const [min, max] = options.value || [null, null];

    const updateFilter = (val, index) => {
      const newRange = [...(options.value || [null, null])];
      newRange[index] = val;
      options.filterCallback(newRange);
    };

    return (
      <div className="flex gap-2">
        <input type="number" value={min || ''} onChange={(e) => updateFilter(+e.target.value, 0)} placeholder="מינ'" />
        <input type="number" value={max || ''} onChange={(e) => updateFilter(+e.target.value, 1)} placeholder="מקס'" />
      </div>
    );
  };

  if (isLoading) return <div style={{ textAlign: 'center', padding: '2rem' }}>טוען...</div>;
  if (isError) return <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>שגיאה: {error?.message || 'שגיאה לא ידועה'}</div>;

  return (
    <>
      <Dialog header="הוספת ספר דרוש" visible={visibleAdd} onHide={() => setVisibleAdd(false)} modal style={{ width: '40vw' }}>
        <AddBookNeeded onSuccess={() => { setVisibleAdd(false); refetch(); }} />
      </Dialog>

      <Dialog header="עדכון ספר" visible={!!selectedBook} onHide={() => setSelectedBook(null)} modal style={{ width: '40vw' }}>
        <UpdateBookNeeded bookNeeded={selectedBook} onSuccess={() => { setSelectedBook(null); refetch(); }} />
      </Dialog>

      <div className="card" style={{ padding: '1rem' }}>
        <h2 style={{ fontFamily: 'Secular One' }}>רשימת ספרים דרושים</h2>

        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button icon="pi pi-file-excel" onClick={exportExcel} tooltip="ייצוא לאקסל" />
            <Button icon="pi pi-file-pdf" onClick={exportPdf} tooltip="ייצוא ל-PDF" />
          </div>
          <Button icon="pi pi-plus" label="הוספת ספר" onClick={() => setVisibleAdd(true)} />
        </div>

        <DataTable value={bookNeededList} paginator rows={10} dataKey="_id" emptyMessage="לא נמצאו ספרים" responsiveLayout="scroll">
          <Column
            header="פעולות"
            body={(rowData) => (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button icon="pi pi-pencil" className="p-button-sm" onClick={() => setSelectedBook(rowData)} tooltip="עריכה" />
                <Button icon="pi pi-trash" className="p-button-sm p-button-danger" onClick={() => handleDeleteClick(rowData)} tooltip="מחיקה" />
              </div>
            )}
            style={{ width: '10%' }}
          />
          <Column field="name" header="שם" sortable filter filterPlaceholder="חפש לפי שם" />
          <Column field="author" header="מחבר" filter filterPlaceholder="חפש" sortable />
          <Column
            field="price"
            header="מחיר"
            sortable
            filter
            filterField="price"
            dataType="numeric"
            filterElement={priceFilterTemplate}
          />
        </DataTable>
      </div>
    </>
  );
};

export default BookNeededList;
