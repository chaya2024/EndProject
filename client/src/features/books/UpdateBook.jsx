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
  { label: `מפרשי הש"ס`, value: 'מפרשי הש"ס' },
  { label: 'תלמוד בבלי', value: 'תלמוד בבלי' },
  { label: 'תלמוד ירושלמי', value: 'תלמוד ירושלמי' },
  { label: 'משניות', value: 'משניות' },
  { label: 'סידורים', value: 'סידורים' },
  { label: 'שונות', value: 'שונות' },
  { label: 'קונקורדנציה, אנציקלופדיות ומילונים', value: 'קונקורדנציה, אנציקלופדיות ומילונים' }
];

const UpdateBook = ({ book, onSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    id: book._id,
    code: book.code || '',
    name: book.name || '',
    author: book.author || '',
    subject: book.subject || '',
    category: book.category || '',
    notes: book.notes || '',
    donor: book.donor || '',
    image: null
  });
  
  const [updateBook, { isLoading }] = useUpdateBookMutation();

  useEffect(() => {
    setFormData({
      id: book._id,
      code: book.code || '',
      name: book.name || '',
      author: book.author || '',
      subject: book.subject || '',
      category: book.category || '',
      notes: book.notes || '',
      donor: book.donor || '',
      image: null
    });
  }, [book]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value !== undefined ? e.target.value : e.value;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e) => {
    if (e.files?.length) {
      setFormData(prev => ({
        ...prev,
        image: e.files[0]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("id", formData.id); // Use formData.id instead of book.id
    form.append("code", formData.code);
    form.append("name", formData.name);
    form.append("author", formData.author);
    form.append("subject", formData.subject);
    form.append("category", formData.category);
    form.append("notes", formData.notes);
    form.append("donor", formData.donor);
    
    // Only append image if a new one was selected
    if (formData.image && typeof formData.image !== "string") {
      form.append("image", formData.image);
    }

    try {
      await updateBook(form).unwrap();
      alert("הספר עודכן בהצלחה!");
      onSuccess?.();
      onClose?.();
    } catch (err) {
      alert("אירעה שגיאה בעדכון הספר: " + (err?.data?.message || err?.message || 'שגיאה לא ידועה'));
      console.error(err);
    }
  };

  return (
    <div className="book-form" style={{ padding: '1rem' }}>
      <h2>עדכון ספר</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="p-field">
          <label htmlFor="code">קוד ספר</label>
          <InputText 
            id="code"
            name="code" 
            value={formData.code} 
            onChange={handleChange} 
            required 
            placeholder="קוד ספר" 
            type="number" 
          />
        </div>
        
        <div className="p-field">
          <label htmlFor="name">שם ספר</label>
          <InputText 
            id="name"
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            placeholder="שם ספר" 
          />
        </div>
        
        <div className="p-field">
          <label htmlFor="author">מחבר</label>
          <InputText 
            id="author"
            name="author" 
            value={formData.author} 
            onChange={handleChange} 
            required 
            placeholder="מחבר" 
          />
        </div>
        
        <div className="p-field">
          <label htmlFor="subject">נושא</label>
          <InputTextarea 
            id="subject"
            name="subject" 
            value={formData.subject} 
            onChange={handleChange} 
            rows={3} 
            placeholder="נושא" 
          />
        </div>
        
        <div className="p-field">
          <label htmlFor="category">קטגוריה</label>
          <Dropdown 
            id="category"
            name="category" 
            value={formData.category} 
            options={categories} 
            onChange={handleChange} 
            placeholder="בחר קטגוריה" 
            required 
          />
        </div>
        
        <div className="p-field">
          <label htmlFor="notes">הערות</label>
          <InputTextarea 
            id="notes"
            name="notes" 
            value={formData.notes} 
            onChange={handleChange} 
            rows={3} 
            placeholder="הערות" 
          />
        </div>
        
        <div className="p-field">
          <label htmlFor="image">תמונה חדשה</label>
          <FileUpload 
            id="image"
            mode="basic" 
            accept="image/*" 
            maxFileSize={5000000} 
            onSelect={handleFileSelect} 
            chooseLabel="בחר תמונה חדשה" 
          />
          {formData.image && typeof formData.image !== "string" && (
            <div style={{ marginTop: '1rem' }}>
              <img 
                src={URL.createObjectURL(formData.image)} 
                alt="תמונה נבחרת" 
                style={{ width: '120px', height: 'auto', borderRadius: '4px' }} 
              />
            </div>
          )}
          {book.image && !formData.image && (
            <div style={{ marginTop: '1rem' }}>
              <p>תמונה נוכחית:</p>
              <img 
                src={`http://localhost:1234/uploads/${book.image}`} 
                alt="תמונה נוכחית" 
                style={{ width: '120px', height: 'auto', borderRadius: '4px' }} 
              />
            </div>
          )}
        </div>
        
        <div className="p-field">
          <label htmlFor="donor">תורם</label>
          <InputText 
            id="donor"
            name="donor" 
            value={formData.donor} 
            onChange={handleChange} 
            placeholder="תורם" 
          />
        </div>
        
        <Button 
          type="submit" 
          label="עדכן ספר" 
          icon="pi pi-save" 
          loading={isLoading} 
          className="p-button-success" 
        />
      </form>
    </div>
  );
};

export default UpdateBook;