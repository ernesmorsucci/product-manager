//imports
import express from 'express';
import Cart from "../models/cart.model.js"

const cartsRouter = express.Router();

// Ruta para crear un nuevo carrito
cartsRouter.post('/', async (req, res) => {
  try {
    const cart = new Cart();
    await cart.save();

    res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ satus: "error", message: "error al crear un carrito" });
  }
});

// Ruta para obtener los productos de un carrito por su ID
cartsRouter.get('/:cid/products', async (req, res) => {
  try {
    const cid = req.params.cid;

    const cart = await Cart.findById(cid).populate("products.product");
    if(!cart) return res.status(404).json({ status: "error", message: "carrito no encontrado"});

    res.status(200).json({ status: "success", payload: cart.products });
  } catch (error) {
    res.status(500).json({ status: "error", message: "error al recuperar el carrito" });
  }
});

// Agregar un producto a un carrito
cartsRouter.post('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const quantity = (req.body) ? req.body.quantity : 1;

    const cart = await Cart.findById(cid);
    if(!cart) return res.status(404).json({ status: "error", message: "carrito no encontrado" });

    // Validacion en caso de que el producto este agregado
    const existingProduct = cart.products.find(p => p.product.toString() === pid.toString());
    if(existingProduct) return res.status(400).json({ status: "error", message: "el producto ya se encuentra en el carrito" });

    cart.products.push({ product: pid, quantity });
    await cart.save();

    res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: "error al añadir un producto al carrito: " + error.message });
  }
});

// Actualizar la cantidad de un producto agregado previamente
cartsRouter.put('/:cid/products/:pid', async(req, res) => {
  try{
    const { cid, pid } = req.params;

    if(!req.body) return res.status(400).json({ status: "error", message: "se debe enviar quantity en el body" });
    const  quantity = req.body.quantity;
    
    const cart = await Cart.findById(cid);
    if(!cart) return res.status(404).json({ status: "error", message: "carrito no encontrado" });

    // Buscar si el producto se encuentra en el carrito
    const existingProduct = cart.products.find(p => p.product.toString() === pid.toString());

    if(existingProduct){
      existingProduct.quantity = quantity;
    } else{
      return res.status(404).json({ status: "error", message: "el producto no se encuentra en el carrito" });
    }

    await cart.save();

    res.status(200).json({ status: "success", payload: cart });
  } catch(error){
    res.status(500).json({ status: "error", message: "error al actualizar un producto del carrito" });
  }
});

cartsRouter.delete('/:cid/products/:pid', async(req, res) => {
  try{
    const { cid, pid } = req.params;

    const cart = await Cart.findById(cid);
    if(!cart) return res.status(404).json({ status: "error", message: "carrito no encontrado" });

    const product = cart.products.find(p => p.product.toString() === pid.toString());
    if(!product) return res.status(404).json({ status: "error", message: "el producto no se encuentra en el carrito" });

    cart.products = cart.products.filter(p => p.product.toString() !== pid.toString());
    await cart.save();

    res.status(200).json({ status: "success", payload: cart });
  } catch(error){
    res.status(500).json({ status: "success", message: "error al eliminar el producto" });
  }
});

cartsRouter.delete('/:cid/products', async(req, res) => {
  try{
    const { cid } = req.params;

    const cart = await Cart.findById(cid);
    if(!cart) return res.status(404).json({ status: "error", message: "carrito no encontrado" }); 

    cart.products = [];
    await cart.save();

    res.status(200).json({ status: "success", payload: cart });
  } catch(error){
    res.status(500).json({ status: "error", message: "error al vaciar el carrito" });
  }
});

cartsRouter.delete('/:cid/delete', async(req, res) => {
  try{
    const { cid } = req.params;

    const deletedCart = await Cart.findByIdAndDelete(cid);
    if(!deletedCart) return res.status(404).json({ status: "error", message: "carrito no encontrado" }); 

    res.status(200).json({ status: "success", payload: deletedCart });
  } catch(error){
    res.status(500).json({ status: "error", message: "error al eliminar el carrito" });
  }
});

export default cartsRouter;
