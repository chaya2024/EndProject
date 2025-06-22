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

    const form = new FormData();
    form.append("id", donor._id); 
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("numberPhone", formData.numberPhone);
    form.append("commemoratesNames", formData.commemoratesNames);
    form.append("notes", formData.notes);

    try {
      await updateDonor(form).unwrap();
      alert("התורם עודכן בהצלחה!");
      if (onSuccess) onSuccess();
    } catch (err) {
      alert("אירעה שגיאה בעדכון התורם: " + (err?.data?.message || err?.message || "שגיאה לא ידועה"));
      console.error(err);
    }
  };

  return (
    <div className="book-form" style={{ padding: '1rem' }}>
      <h2>עדכון ספר</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <InputText name="name" value={formData.name} onChange={handleChange} placeholder="שם תורם" />
        <InputText name="email" value={formData.email} onChange={handleChange} placeholder="כתובת מייל" />
        <InputTextarea name="numberPhone" value={formData.numberPhone} onChange={handleChange} placeholder="מספר טלפון" />
        <InputTextarea name="commemoratesNames" value={formData.commemoratesNames} onChange={handleChange} placeholder="שמות להנצחה" />
        <InputTextarea name="notes" value={formData.notes} onChange={handleChange} placeholder="הערות" rows={3} />
        <Button type="submit" label="עדכן תורם" icon="pi pi-save" loading={isLoading} className="p-button-warning" />
      </form>
    </div>
  );
};

export default UpdateDonor;
