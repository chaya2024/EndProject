import { useState, useEffect } from "react";
import { useUpdateDonorMutation } from "./donorApiSlice";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

const UpdateDonor = ({ donor, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    numberPhone: "",
    commemoratesNames: "",
    notes: ""
  });

  const [updateDonor, { isLoading }] = useUpdateDonorMutation();

  useEffect(() => {
    if (donor) {
      setFormData({
        name: donor.name || "בעילום שם",
        email: donor.email || "",
        numberPhone: donor.numberPhone || "",
        commemoratesNames: donor.commemoratesNames || "",
        notes: donor.notes || ""
      });
    }
  }, [donor]);

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

    // Send as regular JSON object, not FormData
    const updateData = {
      id: donor._id,
      name: formData.name,
      email: formData.email,
      numberPhone: formData.numberPhone,
      commemoratesNames: formData.commemoratesNames,
      notes: formData.notes
    };

    try {
      await updateDonor(updateData).unwrap();
      alert("התורם עודכן בהצלחה!");
      if (onSuccess) onSuccess();
    } catch (err) {
      alert("אירעה שגיאה בעדכון התורם: " + (err?.data?.message || err?.message || "שגיאה לא ידועה"));
      console.error(err);
    }
  };

  return (
    <div className="donor-form" style={{ padding: '1rem' }}>
      <h2>עדכון תורם</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="p-field">
          <label htmlFor="name">שם תורם</label>
          <InputText 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="שם תורם" 
          />
        </div>
        <div className="p-field">
          <label htmlFor="email">אימייל</label>
          <InputText 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="כתובת מייל" 
          />
        </div>
        <div className="p-field">
          <label htmlFor="numberPhone">מספר טלפון</label>
          <InputText 
            id="numberPhone" 
            name="numberPhone" 
            value={formData.numberPhone} 
            onChange={handleChange} 
            placeholder="מספר טלפון" 
          />
        </div>
        <div className="p-field">
          <label htmlFor="commemoratesNames">שמות להנצחה</label>
          <InputText 
            id="commemoratesNames" 
            name="commemoratesNames" 
            value={formData.commemoratesNames} 
            onChange={handleChange} 
            placeholder="שמות להנצחה" 
          />
        </div>
        <div className="p-field">
          <label htmlFor="notes">הערות</label>
          <InputTextarea 
            id="notes" 
            name="notes" 
            value={formData.notes} 
            onChange={handleChange} 
            placeholder="הערות" 
            rows={3} 
          />
        </div>
        <Button 
          type="submit" 
          label="עדכן תורם" 
          icon="pi pi-save" 
          loading={isLoading} 
          className="p-button-warning" 
        />
      </form>
    </div>
  );
};

export default UpdateDonor;