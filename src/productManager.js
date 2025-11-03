//imports
import fs from "fs/promises";
import crypto from "crypto";

class ProductManager{
  constructor(productsPathFile){
    this.productsPathFile = productsPathFile;
  }

  //generar id aleatorio
  generateNewId(){
    return crypto.randomUUID();
  }

  //recuperar datos del json
  async getProductsFileData(){
    try{
      const fileData = await fs.readFile(this.productsPathFile, "utf-8");
      return JSON.parse(fileData);
    } catch(error){
      throw new Error("Error al conseguir data json" + error.message);
    }
  }

  //traer todos los productos
  async getProducts(){
    try{
      //recuperar datos del json
      const products = await this.getProductsFileData();

      return products;
    } catch(error){
      throw new Error("error al traer los productos: " + error.message);
    }
  }

  //traer producto por su id
  async getProductById(pid){
    try{
      //recuperar datos del json
      const products = await this.getProductsFileData();

      //indice del producto
      const indexProduct = products.findIndex((product) => product.id === pid);
      if(indexProduct === -1) throw new Error("el producto no existe");

      return products[indexProduct];
    } catch(error){
      throw new Error("error al traer el producto: " + error.message);
    }
  }

  //añadir un nuevo producto
  async addProduct(newProduct){
    try{
      //recuperar datos del json
      const products = await this.getProductsFileData();
      
      //generamos id
      const newId = this.generateNewId();
      //creamos el nuevo producto y lo pusheamos al array de productos
      const product = { id: newId, ...newProduct };
      products.push(product);

      //guardamos los productos en el json
      await fs.writeFile( this.productsPathFile, JSON.stringify(products, null, 2) , "utf8" );

      return products;
    } catch(error){
      throw new Error("error al añadir un producto: " + error.message);
    }
  }

  //editar producto por id
  async setProductById(pid, updates){
    try{
      //revisamos si intenta modificar  el id
      if(updates.id !== undefined) throw new Error("no pudes modificar el id");
      
      //recuperar datos del json
      const products = await this.getProductsFileData();

      //bucamos el indice del producto
      const indexProduct = products.findIndex((product) => product.id === pid);
      if(indexProduct === -1) throw new Error("producto no encontrado");
      
      products[indexProduct] = {...products[indexProduct], ...updates};

      //guardamos los productos en el json
      await fs.writeFile( this.productsPathFile, JSON.stringify(products, null, 2) , "utf8" );

      return products;
    } catch(error){
      throw new Error("error al editar un producto: " + error.message);
    }
  }

  //borrar producto por id
  async deleteProductById(pid){
    try{
      //recuperar datos del json
      const products = await this.getProductsFileData();

      //filtramos el array, quitando el producto
      const filteredProducts = products.filter((product) => product.id !== pid);

      //guardamos los productos en el json
      await fs.writeFile( this.productsPathFile, JSON.stringify(filteredProducts, null, 2) , "utf8" );

      return filteredProducts;
    } catch(error){
      throw new Error("error al borrar un producto: " + error.message);
    }
  }
}

export default ProductManager;