import express, { json } from 'express';
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
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const stock = req.body.stock;
    const category = req.body.category;

    const code = title + Math.floor(Math.random() * 1000);
    const status = true;
    const thumbnail = "";

    const product = { title, description, code, price, status, stock, category, thumbnail }
    let addedProduct = await productManager.addProduct(product);
    addedProduct = addedProduct[addedProduct.length - 1];

    //Enviamos un emit para renderizar el producto en el dom
    req.io.emit('newProduct', addedProduct);
    res.status(201).json({ message: "Producto agregado" }, product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// Ruta para actualizar un producto por ID
productsRouter.put('/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;
    const updates = req.body;
    const products = await productManager.setProductById(pid, updates);
    
    //Enviamos un emit para actualizar el producto en el dom
    req.io.emit('updatedProduct', await productManager.getProductById(pid));
    res.status(200).json({ message: "Producto actualizado" }, products);  
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
})

// Ruta para eliminar un producto por ID
productsRouter.delete('/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;

    req.io.emit('deletedProduct', await productManager.getProductById(pid));
    const products = await productManager.deleteProductById(pid);
  
    res.status(200).json({ message: "Producto eliminado" }, products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

export default productsRouter;