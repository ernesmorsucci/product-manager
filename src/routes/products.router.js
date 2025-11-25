//imports
import express from 'express';
import Product from "../models/product.model.js"

const productsRouter = express.Router();

// Ruta para obtener todos los productos
productsRouter.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;

    const data = await Product.paginate({}, { limit, page, lean: true });
    const products = data.docs;
    delete data.docs;

    const prevLink = data.hasPrevPage ? `localhost:8080/api/products/?page=${data.prevPage}` : null;
    const nextLink = data.hasNextPage ? `localhost:8080/api/products/?page=${data.nextPage}` : null;
    const newData = { ...data, prevLink, nextLink };

    res.status(200).json({ status: "succes", payload: products, newData });
  } catch (error) {
    res.status(500).json({ status: "error", message: "error al recuperar los productos" });
  }
});

// Ruta para obtener un producto por ID
productsRouter.get('/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;

    const product = await Product.findById(pid);
    if(!product) return res.status(404).json({ status: "error", message: "producto no encontrado" });

    res.status(200).json({ status: "succes", payload: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: "error al recuperar un producto" });
  }
});

// Ruta para agregar un nuevo producto
productsRouter.post('/', async (req, res) => {
  try {
    const newProduct = req.body;

    const product = new Product(newProduct);
    await product.save();

    res.status(201).json({ status: "succes", payload: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: "error al agregar un producto" });
  }
});

// Ruta para actualizar un producto por ID
productsRouter.put('/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;
    const updates = req.body;
    
    const product = await Product.findByIdAndUpdate(pid, updates, { new: true, runValidators: true });
    if(!product) return res.status(404).json({ status: "error", message: "producto no encontrado" });

    res.status(200).json({ status: "succes", payload: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: "error al actualizar un producto" });
  }
});

// Ruta para eliminar un producto por ID
productsRouter.delete('/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;

    const deletedProduct = await Product.findByIdAndDelete(pid);
    if(!deletedProduct) return res.status(404).json({ status: "error", message: "producto no encontrado" });

    res.status(200).json({ status: "succes", payload: deletedProduct });
  } catch (error) {
    res.status(500).json({ status: "error", message: "error al eliminar un producto" });
  }
})

export default productsRouter;