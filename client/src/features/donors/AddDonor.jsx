import { useState } from "react";
import { useAddDonorMutation } from "./donorApiSlice";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

const AddDonor = ({ onSuccess }) => {
  const [addDonor, { isLoading }] = useAddDonorMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    numberPhone: "",
    commemoratesNames: "",
    notes: ""
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value !== undefined ? e.target.value : e.value;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDonor(formData).unwrap();
      alert("התורם נוסף בהצלחה!");
      setFormData({
        name: "",
        email: "",
        numberPhone: "",
        commemoratesNames: "",
        notes: ""
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      alert("אירעה שגיאה בהוספת התורם: " + (err?.data?.message || err?.message || 'שגיאה לא ידועה'));
      console.error(err);
    }
  };

  return (
    <div className="donor-form" style={{ padding: '1rem' }}>
      <h2>הוספת תורם חדש</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <InputText name="name" value={formData.name} onChange={handleChange} placeholder="שם תורם" />
        <InputText name="email" value={formData.email} onChange={handleChange} placeholder="אימייל" />
        <InputText name="numberPhone" value={formData.numberPhone} onChange={handleChange} placeholder="מספר טלפון" />
        <InputText name="commemoratesNames" value={formData.commemoratesNames} onChange={handleChange} placeholder="שמות להנצחה" />
        <InputTextarea name="notes" value={formData.notes} onChange={handleChange} placeholder="הערות (לא חובה)" rows={3} />

        <Button
          type="submit"
          label="הוסף תורם"
          icon="pi pi-plus"
          loading={isLoading}
          className="p-button-success"
        />
      </form>
    </div>
  );
};

export default AddDonor;
