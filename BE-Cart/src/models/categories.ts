import moongoose, { Document, Schema } from 'mongoose';

interface ICategory extends Document {
  name: String,
  icon: String,
  createdAt: Date,
  updatedAt: Date
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

categorySchema.index({ name: 'text' }); // Text index for full-text search

const Category = moongoose.model<ICategory>('Category', categorySchema);
export default Category;
