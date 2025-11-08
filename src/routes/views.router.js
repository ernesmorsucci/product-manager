import express from 'express';
import ProductManager from '../productManager.js';

const viewsRouter = express.Router();
const productManager = new ProductManager('./src/data/products.json');

// Route to render the home view with products
viewsRouter.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('home', { products });
  } catch (error) {
    res.status(500).send('Error retrieving products');
  }})

// Ruta para obtener la vista de productos en tiempo real
viewsRouter.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener los productos' });
  }
})

export default viewsRouter;