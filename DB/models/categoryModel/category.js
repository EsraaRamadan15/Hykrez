import pkg from 'mongoose';
const { Schema, model } = pkg;

  
const categorySchema = new Schema({
    nameEn: {
        type: String,
        required: true,
        alias: 'name'
    },
    nameAr: {
        type: String,
        required: true
    },
    sortOrder: {
        type: Number,
        required: true
    },image:{
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const categoryModel = model('Category', categorySchema)
export default categoryModel