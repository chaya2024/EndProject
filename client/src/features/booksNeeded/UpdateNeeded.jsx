import { useState, useEffect } from "react";
import { useUpdateBookNeededMutation } from "./neededApiSlice";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import UpdateBook from "../books/UpdateBook";

const UpdateBookNeeded = ({ bookNeeded, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    price: ""
  });

  const [updateBookNeeded, { isLoading }] = useUpdateBookNeededMutation();

  useEffect(() => {
    if (bookNeeded) {
      setFormData({
        name: bookNeeded.name,
        author: bookNeeded.author || "",
        price: bookNeeded.price || ""
      });
    }
  }, [bookNeeded]);

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

    const updateData = {
      id: bookNeeded._id,
      name: formData.name,
      author: formData.author,
      price: formData.price
    };

    try {
      await updateBookNeeded(updateData).unwrap();
      alert("הספר הדרוש עודכן בהצלחה!");
      if (onSuccess) onSuccess();
    } catch (err) {
      alert("אירעה שגיאה בעדכון הספר הדרוש: " + (err?.data?.message || err?.message || "שגיאה לא ידועה"));
      console.error(err);
    }
  };

  return (
    <div className="donor-form" style={{ padding: '1rem' }}>
      <h2>עדכון ספר</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="p-field">
          <label htmlFor="name">שם ספר</label>
          <InputText 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="שם ספר דרוש" 
          />
        </div>
        <div className="p-field">
          <label htmlFor="author">מחבר</label>
          <InputText 
            id="author" 
            name="author" 
            value={formData.author} 
            onChange={handleChange} 
            placeholder="מחבר הספר" 
          />
        </div>
        <div className="p-field">
          <label htmlFor="price">מחיר</label>
          <InputText 
            id="price" 
            name="price" 
            value={formData.price} 
            onChange={handleChange} 
            placeholder="מחיר הספר" 
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

export default UpdateBookNeeded;