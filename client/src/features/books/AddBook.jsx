import { useState } from "react";
import { useAddBookMutation } from "./bookApiSlice";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";

const categories = [
  { label: 'תנ"ך ומפרשיו', value: 'TANACH' },
  { label: 'מועדים', value: 'FESTIVALS' },
  { label: 'מחשבה', value: 'THOUGHT' },
  { label: 'מוסר', value: 'ETHICS' },
  { label: 'חסידות', value: 'CHASSIDUT' },
  { label: 'הלכה', value: 'HALACHA' },
  { label: `מפרשי הש"ס`, value: 'TALMUD_COMMENTATORS' },
  { label: 'תלמוד בבלי', value: 'BAVLI' },
  { label: 'תלמוד ירושלמי', value: 'YERUSHALMI' },
  { label: 'משניות', value: 'MISHNAH' },
  { label: 'סידורים', value: 'SIDDURIM' },
  { label: 'שונות', value: 'MISC' },
  { label: 'קונקורדנציה, אנציקלופדיות ומילונים', value: 'REFERENCE' }
];

const AddBook = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    author: "",
    subject: "",
    category: "",
    notes: "",
    image: null,
    donor: "",
  });

  const [addBook, { isLoading }] = useAddBookMutation();

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
      await addBook(form).unwrap();
      alert("הספר נוסף בהצלחה!");
      setFormData({
        code: "",
        name: "",
        author: "",
        subject: "",
        category: "",
        notes: "",
        image: null,
        donor: ""
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      alert("אירעה שגיאה בהוספת הספר");
      console.error(err);
    }
  };

  return (
    <div className="book-form">
      <h2>הוספת ספר חדש</h2>
      <form onSubmit={handleSubmit}>
        <div className="p-field">
          <label htmlFor="code">קוד ספר</label>
          <InputText id="code" name="code" value={formData.code} onChange={handleChange} required />
        </div>
        <div className="p-field">
          <label htmlFor="name">שם ספר</label>
          <InputText id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="p-field">
          <label htmlFor="author">מחבר</label>
          <InputText id="author" name="author" value={formData.author} onChange={handleChange} required />
        </div>
        <div className="p-field">
          <label htmlFor="subject">נושא</label>
          <InputTextarea id="subject" name="subject" value={formData.subject} onChange={handleChange} rows={3} />
        </div>
        <div className="p-field">
          <label htmlFor="category">קטגוריה</label>
          <Dropdown id="category" name="category" value={formData.category} options={categories} onChange={handleChange} placeholder="בחר קטגוריה" />
        </div>
        <div className="p-field">
          <label htmlFor="notes">הערות</label>
          <InputTextarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={3} />
        </div>
        <div className="p-field">
          <label htmlFor="image">תמונה</label>
          <FileUpload
            id="image"
            name="image"
            mode="basic"
            accept=".jpg,.jpeg,.png"
            customUpload
            uploadHandler={(e) => setFormData({ ...formData, image: e.files[0] })}
          />
          {/* תצוגה מקדימה */}
          {formData.image && (
            <div style={{ marginTop: '1rem' }}>
              <img src={URL.createObjectURL(formData.image)} alt="תצוגה" width={120} />
            </div>
          )}
        </div>
        <div className="p-field">
          <label htmlFor="donor">תורם</label>
          <InputText id="donor" name="donor" value={formData.donor} onChange={handleChange} />
        </div>
        <Button type="submit" label="הוסף ספר" icon="pi pi-plus" loading={isLoading} />
      </form>
    </div>
  );
};

export default AddBook;