import mongoose from "mongoose";

const connectMongoDB = async() => {
  try{
    await mongoose.connect ("mongodb+srv://ernesdev:ernesdev@ecommerce-cluster.mkqlodd.mongodb.net/productManager?appName=ecommerce-cluster");
    console.log("Conectado correctamente a MongoDB");
  } catch(error){
    console.log("No se puede conectar a MongoDB: ", error.message);
  }
}

export default connectMongoDB;