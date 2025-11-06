import express from 'express';
import ProductManager from '../productManager.js';

const productsRouter = express.Router();
const productManager = new ProductManager('./src/data/products.json');

// Ruta para obtener todos los productos
productsRouter.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al conseguir los productos' });
  }
})

// Ruta para obtener un producto por ID
productsRouter.get('/:pid', async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.pid);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al conseguir el producto' });
  }
})

// Ruta para agregar un nuevo producto
productsRouter.post('/', async (req, res) => {
  try {
    const newProduct = req.body;
    const products = await productManager.addProduct(newProduct);
    res.status(201).json({ message: "Producto agregado" }, products);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
})

// Ruta para actualizar un producto por ID
productsRouter.put('/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;
    const updates = req.body;
    const products = await productManager.setProductById(pid, updates);
    res.status(200).json({ message: "Producto actualizado" }, products);  
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
})

// Ruta para eliminar un producto por ID
productsRouter.delete('/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;
    const products = await productManager.deleteProductById(pid);
    res.status(200).json({ message: "Producto eliminado" }, products);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
})

export default productsRouter;