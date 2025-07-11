import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useGetMessageQuery, useDeleteMessageMutation } from './messageApiSlice';
import AddMessage from './AddMessage';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useSelector } from 'react-redux';

const MessageList = () => {
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  const { data: messagesList = [], isLoading, isError, error, refetch } = useGetMessageQuery(undefined, { skip: !isUserLoggedIn });
  const [deleteMessage] = useDeleteMessageMutation();
  const [visibleAdd, setVisibleAdd] = useState(false);

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(messagesList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Messages');
    XLSX.writeFile(workbook, 'messages.xlsx');
  };

  const exportPdf = () => {
    const doc = new jsPDF();
    doc.text('רשימת הודעות', 14, 16);
    const tableColumn = ['שם', 'נושא', 'פירוט', 'מספר טלפון', 'הערות'];
    const tableRows = messagesList.map((message) => [
      message.name,
      message.subject,
      message.detail,
      message.numberPhone,
      message.notes,
    ]);
    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
    doc.save('הודעות.pdf');
  };

  const handleDeleteClick = async (message) => {
    if (window.confirm(`האם למחוק את ההודעה מ"${message.name}"?`)) {
      try {
        await deleteMessage(message._id).unwrap();
        refetch();
        alert('ההודעה נמחקה בהצלחה');
      } catch (err) {
        console.error('שגיאה במחיקה:', err);
        alert('אירעה שגיאה במחיקת ההודעה');
      }
    }
  };

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>טוען...</div>;
  }

  if (isError) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
        שגיאה: {error?.message || 'שגיאה לא ידועה'}
      </div>
    );
  }

  return (
    <>
      <Dialog
        header="שליחת הודעה לספרן"
        visible={visibleAdd}
        onHide={() => setVisibleAdd(false)}
        modal
        style={{ width: '40vw' }}
      >
        <AddMessage onSuccess={() => { setVisibleAdd(false); refetch(); }} />
      </Dialog>

      <div className="card" style={{ padding: '1rem' }}>
        {/* שורת כפתורים */}
        <div
          style={{
            marginBottom: '1rem',
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          {/* כפתור הפלוס – תמיד */}
          <Button
            icon="pi pi-plus"
            tooltip="שליחת הודעה חדשה"
            onClick={() => setVisibleAdd(true)}
            tooltipOptions={{ position: 'left' }}
            style={{ backgroundColor: '#c4a484', borderColor: '#c4a484', color: 'white' }}
          />

          {/* כפתורי ייצוא – רק אם מחובר */}
          {isUserLoggedIn && (
            <>
              <Button
                icon="pi pi-file-excel"
                onClick={exportExcel}
                tooltip="ייצוא לאקסל"
                style={{ backgroundColor: '#c4a484', borderColor: '#c4a484', color: 'white' }}
              />
              <Button
                icon="pi pi-file-pdf"
                onClick={exportPdf}
                tooltip="ייצוא ל-PDF"
                style={{ backgroundColor: '#DEB887', borderColor: '#DEB887', color: 'white' }}
              />
            </>
          )}
        </div>

        {/* טבלה או הודעה על התחברות */}
        {isUserLoggedIn ? (
          <DataTable
            value={messagesList}
            paginator
            rows={10}
            dataKey="_id"
            emptyMessage="לא התקבלו הודעות"
            responsiveLayout="scroll"
          >
            <Column
              header="פעולות"
              body={(rowData) => (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button
                    icon="pi pi-trash"
                    className="p-button-sm p-button-danger"
                    onClick={() => handleDeleteClick(rowData)}
                    tooltip="מחיקה"
                    style={{ backgroundColor: '#c4a484', borderColor: '#c4a484', color: 'white' }}
                  />
                </div>
              )}
              style={{ width: '10%' }}
            />
            <Column field="name" header="שם" sortable filter filterPlaceholder="חפש לפי שם" />
            <Column field="subject" header="נושא" />
            <Column field="detail" header="פירוט" />
            <Column field="numberPhone" header="מספר טלפון" />
            <Column field="notes" header="הערות" />
          </DataTable>
        ) : (
          <div style={{ textAlign: 'center', color: 'gray', marginTop: '2rem' }}>
            על כל בעיה, כאן תוכל לשלוח הודעה לצוות הספרייה
          </div>
        )}
      </div>
      {isUserLoggedIn && <Button
        icon="pi pi-refresh" className="p-button-secondary" tooltip="טען" tooltipOptions={{ position: 'top' }} style={{ backgroundColor: '#FFFF', borderColor: '#FFFF', color: 'BLACK' }} size="small" onClick={refetch}
      />}
    </>
  );
};

export default MessageList;
