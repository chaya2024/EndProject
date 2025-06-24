import { useState } from "react";
import { useAddMessageMutation } from "./messageApiSlice";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";

const Subjects = [
  { label: "תרומות", value: "תרומות" },
  { label: "הערות", value: "הערות" },
  { label: "שאלות", value: "שאלות" },
  { label: "הצעות", value: "הצעות" },
  { label: "אחר", value: "אחר" },
];

const AddMessage = ({ onSuccess }) => {
  const [addMessage, { isLoading }] = useAddMessageMutation();

  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    detail: "",
    numberPhone: "",
    notes: ""
  });

  const handleChange = (e) => {
    const name = e.target?.name || e.name;
    const value = e.target?.value !== undefined ? e.target.value : e.value;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMessage(formData).unwrap();
      alert("ההודעה נשלחה בהצלחה!");
      setFormData({
        name: "",
        subject: "",
        detail: "",
        numberPhone: "",
        notes: ""
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      alert("אירעה שגיאה בשליחת ההודעה: " + (err?.data?.message || err?.message || 'שגיאה לא ידועה'));
      console.error(err);
    }
  };

  return (
    <div className="message-form" style={{ padding: '1rem' }}>
      <h2>שליחת הודעה חדשה</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <InputText name="name" value={formData.name} onChange={handleChange} placeholder="שם שולח" required />
        <Dropdown name="subject" value={formData.subject} options={Subjects} onChange={handleChange} placeholder="נושא ההודעה" required />
        <InputText name="detail" value={formData.detail} onChange={handleChange} placeholder="פירוט" required />
        <InputText name="numberPhone" value={formData.numberPhone} onChange={handleChange} placeholder="מספר טלפון ליצירת קשר" type="tel" required />
        <InputTextarea name="notes" value={formData.notes} onChange={handleChange} placeholder="הערות (לא חובה)" rows={3} />

        <Button
          type="submit"
          label="שלח הודעה"
          icon="pi pi-plus"
          loading={isLoading}
          className="p-button-success"
        />
      </form>
    </div>
  );
};

export default AddMessage;
