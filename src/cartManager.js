//imports
import fs from "fs/promises";
import crypto from "crypto";

class CartManager{
  constructor(cartsPathFile, productsPathFile) {
    this.cartsPathFile = cartsPathFile;
    this.productsPathFile = productsPathFile;
  }

  //generar id aleatorio
  generateNewId(){
    return crypto.randomUUID();
  }

  //recuperar datos del carts.json
  async getCartsFileData(){
    try{
      const fileData = await fs.readFile(this.cartsPathFile, "utf-8");
      return JSON.parse(fileData);
    } catch(error){
      throw new Error("Error al conseguir data de carrito json" + error.message);
    }
  }

  //recuperar datos del products.json
  async getProductsFileData(){
    try{
      const fileData = await fs.readFile(this.productsPathFile, "utf-8");
      return JSON.parse(fileData);
    } catch(error){
      throw new Error("Error al conseguir data de productos json" + error.message);
    }
  }

  async addCart(){
    try{
      //recuperar datos del json
      const carts = await this.getCartsFileData();

      //generamos id
      const newId = this.generateNewId();
      //creamos el nuevo carrito y lo pusheamos al array de carritos
      const cart = {id : newId, products: []};
      carts.push(cart);

      //guardamos los productos en el json
      await fs.writeFile( this.cartsPathFile, JSON.stringify(carts, null, 2) , "utf8" );
    
      return carts;
    } catch(error){
      throw new Error("error al crear un nuevo carrito " + error.message);
    }
  }

  async getProductsByCartId(cid){
    try{
      //recuperar datos del json
      const carts = await this.getCartsFileData();

      //buscamos el indice del carrito
      const indexCart = carts.findIndex((cart) => cart.id === cid);
      if(indexCart === -1) throw new Error("el carrito no existe");

      return {products: carts[indexCart].products};
    } catch(error){
      throw new Error("error al conseguir un carrito: " + error.message);
    }
  }

  async addProductInCart(cid, pid, quantity){
    try{
      //recuperar datos del json
      const carts = await this.getCartsFileData();
      const products = await this.getProductsFileData();

      //buscamos el indice del carrito
      const indexCart = carts.findIndex((cart) => cart.id === cid);
      if(indexCart === -1) throw new Error("carrito no encontrado");
      
      //buscamos el indice del producto
      const indexProduct = products.findIndex((product) => product.id === pid);
      if(indexProduct === -1) throw new Error("producto no encontrado");
      
      //revisamos si el producto se encuentra en el carrito
      const indexAddedProduct = carts[indexCart].products.findIndex((product) => product.product === products[indexProduct].  id);

      //si se encuentra
      if (indexAddedProduct !== -1){
        //actualizamos la cantidad en el carrito y stock en productos
        if((products[indexProduct].stock - quantity) < 0) throw new Error(`no hay stock suficiente: ${products  [indexProduct].stock}`);
        products[indexProduct].stock -= quantity;

        carts[indexCart].products[indexAddedProduct].quantity += quantity;

        //guardamos los productos en el json
        await fs.writeFile( this.cartsPathFile, JSON.stringify(carts, null, 2) , "utf8" );
        await fs.writeFile( this.productsPathFile, JSON.stringify(products, null, 2) , "utf8" );

        return {message: "cantidad actualizada", product: carts[indexCart].products[indexAddedProduct]};
      } else{ //si no se encuentra
        //agregamos el producto al carrito y actualizamos stock en productos
        if((products[indexProduct].stock - quantity) < 0) throw new Error(`no hay stock suficiente: ${products  [indexProduct].stock}`);
        products[indexProduct].stock -= quantity;

        const newProduct = {product: products[indexProduct].id, quantity};
        carts[indexCart].products.push(newProduct);

        //guardamos los productos en el json
        await fs.writeFile( this.cartsPathFile, JSON.stringify(carts, null, 2) , "utf8" );
        await fs.writeFile( this.productsPathFile, JSON.stringify(products, null, 2) , "utf8" );

        return {message: "agregado al carrito", products: carts[indexCart].products};
      }
    } catch(error){
      throw new Error("error al agregar un producto al carrito: " + error.message);
    }
    
  }
}

export default CartManager;