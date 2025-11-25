//imports
import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.model.js';
import Cart from '../models/cart.model.js';

const viewsRouter = express.Router();

// Ruta para home de productos
viewsRouter.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    let sort = req.query.sort;

    switch(sort){
      case "asc":
        sort = { price: 1 };
        break;
      case "desc":
        sort = { price: -1 };
        break;
      default:
        sort = null;
        break;
    }

    const data = await Product.paginate({}, { limit, page, lean: true, sort });
    const products = data.docs;

    const links = [];
    for(let i = 1; i <= data.totalPages; i++){
      links.push({ text: i, link: `?limit=${limit}&page=${i}` });
    }

    res.render('home', { products, links });
  } catch (error) {
    const serverError = { 
        status: 500,
        title: "Error interno del servidor",
        message: "Ocurrió un error inesperado en el servidor."
      }
      res.render('error', { serverError });
  }});

  viewsRouter.get("/products/:pid", async(req, res) => {
    try{
      const pid = req.params.pid;

      if(!mongoose.isValidObjectId(pid) || !(await Product.exists({ _id: pid }))) {
        const serverError = {
          status: 404,
          title: "Página no encontrada",
          message: "El producto solicitado no existe"
        }
        return res.render('error', { serverError });
      }

      const product = await Product.findById(pid).lean();

      res.render('product', { product });
    } catch(error){
      const serverError = { 
        status: 500,
        title: "Error interno del servidor",
        message: "Ocurrió un error inesperado en el servidor."
      }
      res.render('error', { serverError });
    }
  });

  viewsRouter.get("/carts", async(req, res) => {
    try{
      const carts = await Cart.find().populate("products.product").lean();

      res.render('carts', { carts });
    } catch(error){
      const serverError = { 
        status: 500,
        title: "Error interno del servidor",
        message: "Ocurrió un error inesperado en el servidor."
      }
      res.render('error', { serverError });
    }
  });

  viewsRouter.get("/carts/:cid", async(req, res) => {
    try{
      const cid = req.params.cid;

      if(!mongoose.isValidObjectId(cid) || !(await Cart.exists({ _id: cid }))) {
        const serverError = {
          status: 404,
          title: "Página no encontrada",
          message: "El carrito solicitado no existe"
        }
        return res.render('error', { serverError });
      }

      const cart = await Cart.findById(cid).populate("products.product").lean();

      res.render('singleCart', { cart });
    } catch(error){
      const serverError = { 
        status: 500,
        title: "Error interno del servidor",
        message: "Ocurrió un error inesperado en el servidor."
      }
      res.render('error', { serverError });
    }
  });
      

export default viewsRouter;