import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Starters', 'Main Course', 'Desserts', 'Drinks', 'Celebration Special'],
    required: true,
  },
  name: { type: String, required: true },

  type: { type: String },
  priceFull: { type: String },
  priceHalf: { type: String },

  price180ml: { type: String },
  price90ml: { type: String },
  price60ml: { type: String },
  price30ml: { type: String }
});

export default mongoose.model('MenuItem', MenuItemSchema);
