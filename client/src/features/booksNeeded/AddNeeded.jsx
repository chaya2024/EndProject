import { useState } from "react";
import { useAddBookNeededMutation } from "./neededApiSlice";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

const AddBookNeeded = ({ onSuccess }) => {
  const [addBookList, { isLoading }] = useAddBookNeededMutation();

  const [formData, setFormData] = useState({
    name: "",
    author: "",
    price: ""
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
      await addBookList(formData).unwrap();
      alert("הספר הדרוש נוסף בהצלחה!");
      setFormData({
        name: "",
        author: "",
        price: ""
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      alert("אירעה שגיאה בהוספת הספר הדרוש: " + (err?.data?.message || err?.message || 'שגיאה לא ידועה'));
      console.error(err);
    }
  };

  return (
    <div className="book-form" style={{ padding: '1rem' }}>
      <h2>הוספת ספר חדש</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="p-field">
          <label htmlFor="name">שם ספר</label>
          <InputText id="name" name="name" value={formData.name} onChange={handleChange} required/>
        </div>
        <div className="p-field">
          <label htmlFor="author">מחבר</label>
          <InputText id="author" name="author" value={formData.author} onChange={handleChange} required/>
        </div>
        <div className="p-field">
          <label htmlFor="price">מחיר</label>
          <InputText id="price" name="price" value={formData.price} onChange={handleChange} required type="number"/>
        </div>

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
}

export default AddBookNeeded;