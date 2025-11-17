//imports
import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

//definicion del Schema para Productos
const ProductSchema = new mongoose.Schema({
  title: String,
  description: { type: String, index: "text" },
  code: { type: String, unique: true },
  price: Number,
  stock: Number,
  category: { type: String, index: true },
  status: { type: Boolean, default: true },
  thumbnail: { type: String, default: "" }
});

ProductSchema.plugin(paginate);

const Product = mongoose.model("Product", ProductSchema);
export default Product;