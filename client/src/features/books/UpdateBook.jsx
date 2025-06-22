import { useState, useEffect } from "react";
import { useUpdateBookMutation } from "./bookApiSlice";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";

const categories = [
  { label: 'תנ"ך ומפרשיו', value: 'תנ"ך ומפרשיו' },
  { label: 'מועדים', value: 'מועדים' },
  { label: 'מחשבה', value: 'מחשבה' },
  { label: 'מוסר', value: 'מוסר' },
  { label: 'חסידות', value: 'חסידות' },
  { label: 'הלכה', value: 'הלכה' },
  { label: 'מפרשי הש"ס', value: 'מפרשי הש"ס' },
  { label: 'תלמוד בבלי', value: 'תלמוד בבלי' },
  { label: 'תלמוד ירושלמי', value: 'תלמוד ירושלמי' },
  { label: 'משניות', value: 'משניות' },
  { label: 'סידורים', value: 'סידורים' },
  { label: 'שונות', value: 'שונות' },
  { label: 'קונקורדנציה, אנציקלופדיות ומילונים', value: 'קונקורדנציה, אנציקלופדיות ומילונים' }
];

const UpdateBook = ({ book, onSuccess }) => {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    author: "",
    subject: "",
    category: "",
    notes: "",
    image: null,
    donor: "לא נתרם"
  });

  const [updateBook, { isLoading }] = useUpdateBookMutation();

  useEffect(() => {
    if (book) {
      setFormData({
        code: book.code || "",
        name: book.name || "",
        author: book.author || "",
        subject: book.subject || "",
        category: book.category || "",
        notes: book.notes || "",
        image: null,
        donor: book.donor || ""
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value !== undefined ? e.target.value : e.value;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileSelect = (e) => {
    if (e.files && e.files.length > 0) {
      setFormData(prev => ({
        ...prev,
        image: e.files[0]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("id", book._id); // ודא שהשרת מקבל מזהה
    form.append("code", formData.code);
    form.append("name", formData.name);
    form.append("author", formData.author);
    form.append("subject", formData.subject);
    form.append("category", formData.category);
    form.append("notes", formData.notes);
    form.append("donor", formData.donor);
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      await updateBook(form).unwrap();
      alert("הספר עודכן בהצלחה!");
      if (onSuccess) onSuccess();
    } catch (err) {
      alert("אירעה שגיאה בעדכון הספר: " + (err?.data?.message || err?.message || "שגיאה לא ידועה"));
      console.error(err);
    }
  };

  return (
    <div className="book-form" style={{ padding: '1rem' }}>
      <h2>עדכון ספר</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <InputText name="code" value={formData.code} onChange={handleChange} placeholder="קוד ספר" type="number" required />
        <InputText name="name" value={formData.name} onChange={handleChange} placeholder="שם ספר" required />
        <InputText name="author" value={formData.author} onChange={handleChange} placeholder="מחבר" required />
        <InputTextarea name="subject" value={formData.subject} onChange={handleChange} placeholder="נושא" rows={3} />
        <Dropdown name="category" value={formData.category} options={categories} onChange={handleChange} placeholder="קטגוריה" required />
        <InputTextarea name="notes" value={formData.notes} onChange={handleChange} placeholder="הערות" rows={3} />
        <FileUpload
          name="image"
          mode="basic"
          accept="image/*"
          maxFileSize={5000000}
          onSelect={handleFileSelect}
          chooseLabel="בחר תמונה חדשה"
        />
        {formData.image && (
          <div style={{ marginTop: '1rem' }}>
            <img 
              src={URL.createObjectURL(formData.image)} 
              alt="תצוגה מקדימה" 
              style={{ width: '120px', height: 'auto', borderRadius: '4px' }}
            />
          </div>
        )}
        <InputText name="donor" value={formData.donor} onChange={handleChange} placeholder="תורם" />
        <Button type="submit" label="עדכן ספר" icon="pi pi-save" loading={isLoading} className="p-button-warning" />
      </form>
    </div>
  );
};

export default UpdateBook;
