import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { Product } from "./product.model";
import { ProductsService } from "./products.service";

// Esto define en donde empieza la petición vía rest
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService){}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('title') prodPrice: number,
    ){
      const generateId = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
      return {id: generateId }
  }


  @Get()
  getAllProducts(){
    return this.productsService.getProducts();
  }

  // Le paso el parámetro para que entienda que habrá un 'id' luego del path
  @Get(':id')
  getProduct(
    @Param('id') prodId: string,
    ){
      return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice
  ){
    this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    return prodId;
  }

  @Delete(':id')
  removeProduct(
    @Param('id') prodId: string,
  ) {
    this.productsService.deleteProduct(prodId);
    return prodId;
  }

}