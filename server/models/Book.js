const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
    name:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    author:{
        type: String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    category: {
        TANACH: `תנ"ך ומפרשיו`,
        MOADIM: "מועדים",
        THOUGHT: "מחשבה",
        ETHICS: "מוסר",
        CHASSIDUT: "חסידות",
        HALACHA: "הלכה",
        TALMUD_COMMENTATORS: `מפרשי הש"ס`,
        BAVLI: "תלמוד בבלי",
        YERUSHALMI: "תלמוד ירושלמי",
        MISHNAH: "משנה",
        SIDDURIM: "סידורים",
        MISC: "שונות",
        REFERENCE: "מילונים"
      }
})