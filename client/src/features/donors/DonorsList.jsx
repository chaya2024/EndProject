import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useGetDonorsQuery, useDeleteDonorMutation } from './donorApiSlice';
import AddDonor from './AddDonor';
import UpdateDonor from './UpdateDonor';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Login from '../auth/Login';
import { useSelector, useDispatch } from 'react-redux';

const DonorsList = () => {
  const { data: donorsList = [], isLoading, isError, error, refetch } = useGetDonorsQuery();
  console.log('donorsList:', donorsList);

  const [deleteDonor] = useDeleteDonorMutation();
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(donorsList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Donors');
    XLSX.writeFile(workbook, 'donors.xlsx');
  };

  const exportPdf = () => {
    const doc = new jsPDF();
    doc.text('רשימת תורמים', 14, 16);
    const tableColumn = ['שם', 'אימייל', 'טלפון', 'שמות להנצחה', 'הערות'];
    const tableRows = donorsList.map((donor) => [
      donor.name,
      donor.email,
      donor.numberPhone,
      donor.commemoratesNames,
      donor.notes,
    ]);
    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
    doc.save('תורמים.pdf');
  };

  const handleDeleteClick = async (donor) => {
    if (window.confirm(`האם למחוק את התורם "${donor.name}"?`)) {
      try {
        await deleteDonor(donor._id).unwrap();
        refetch();
        alert('התורם נמחק בהצלחה');
      } catch (err) {
        console.error('שגיאה במחיקה:', err);
        alert('אירעה שגיאה במחיקת התורם');
      }
    }
  };

  if (isLoading) return <div style={{ textAlign: 'center', padding: '2rem' }}>טוען...</div>;
  if (isError) return <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>שגיאה: {error?.message || 'שגיאה לא ידועה'}</div>;

  return (
    <>
      <Dialog header="הוספת תורם" visible={visibleAdd} onHide={() => setVisibleAdd(false)} modal style={{ width: '40vw' }}>
        <AddDonor onSuccess={() => { setVisibleAdd(false); refetch(); }} />
      </Dialog>

      <Dialog header="עדכון תורם" visible={!!selectedDonor} onHide={() => setSelectedDonor(null)} modal style={{ width: '40vw' }}>
        <UpdateDonor donor={selectedDonor} onSuccess={() => { setSelectedDonor(null); refetch(); }} />
      </Dialog>

      <div className="card" style={{ padding: '1rem' }}>
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button icon="pi pi-file-excel" onClick={exportExcel} tooltip="ייצוא לאקסל" style={{ backgroundColor: '#c4a484', borderColor: '#c4a484', color: 'white' }} />
            <Button icon="pi pi-file-pdf" onClick={exportPdf} tooltip="ייצוא ל-PDF" style={{ backgroundColor: '#DEB887', borderColor: '#DEB887', color: 'white' }} />
          </div>
          {isUserLoggedIn && <Button icon="pi pi-plus" tooltip="הוספת תורם" onClick={() => setVisibleAdd(true)} style={{ backgroundColor: '#c4a484', borderColor: '#c4a484', color: 'white' }} />}
        </div>

        <DataTable value={donorsList} paginator rows={10} dataKey="_id" emptyMessage="לא נמצאו תורמים" responsiveLayout="scroll">
          <Column field="name" header="שם" sortable filter filterPlaceholder="חפש לפי שם" />
          <Column field="numberPhone" header="טלפון" />
          <Column field="email" header="אימייל" />
          <Column field="commemoratesNames" header="שמות להנצחה" />
          <Column field="notes" header="הערות" />
          {isUserLoggedIn && <Column header="פעולות" body={(rowData) => (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button icon="pi pi-pencil" className="p-button-sm" onClick={() => setSelectedDonor(rowData)} tooltip="עריכה" style={{ backgroundColor: '#DEB887', borderColor: '#DEB887', color: 'white' }} />
              <Button icon="pi pi-trash" className="p-button-sm p-button-danger" onClick={() => handleDeleteClick(rowData)} tooltip="מחיקה" style={{ backgroundColor: '#c4a484', borderColor: '#c4a484', color: 'white' }} />
            </div>
          )} style={{ width: '10%' }} />}
        </DataTable>
      </div>
      <Button
        icon="pi pi-refresh" className="p-button-secondary" tooltip="טען" tooltipOptions={{ position: 'top' }} style={{ backgroundColor: '#FFFF', borderColor: '#FFFF', color: 'BLACK' }} size="small" onClick={refetch}
      />
    </>
  );
};

export default DonorsList;
