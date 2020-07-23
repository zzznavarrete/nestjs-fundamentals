import { Injectable, NotFoundException, Delete } from "@nestjs/common";
import { Product } from './product.model';

@Injectable()
export class ProductsService {

  private products: Product[] = [];

// Type inference asume que retorno un string y no tengo necesidad de especificarlo
  insertProduct(title: string, description: string, price: number){
    const proId = Math.random().toString();
    const newProduct = new Product(proId, title, description, price);
    this.products.push(newProduct);

    return proId;
  }


  getProducts(){
    return [... this.products];
  }

  getSingleProduct(productId: string){
    const product = this.findProduct(productId)[0];
    return {...product}
  }

  updateProduct(productId: string, title: string, description: string, price: number){
    // Sintax para asignar 2 valores de un método que retorna 2 elementos de un array
    const [product, index] = this.findProduct(productId);
    const updatedProduct = {...product}
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }

    this.products[index] = updatedProduct;
  }

  deleteProduct(prodId: string){
    const index = this.findProduct(prodId)[1];
    this.products.splice(index, 1);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return [product, productIndex];
  }

}