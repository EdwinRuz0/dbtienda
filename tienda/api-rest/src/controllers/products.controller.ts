//products.controller.ts
import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { Productos } from 'src/models/products.model';
import { ProductsService } from 'src/services/products.service';
@Controller()
export class ProductsController {
constructor(private readonly productsService: ProductsService) {}
  @Get('/api/producto')
  async getAllProducts() { //obtener todos los datos de todos los productos
    const products = await this.productsService.getAllProducts();
    return products;
  } 
  @Get('/api/producto/:id') //obtener todos los datos del producto por el id
  async getProductDataId(@Param('id') id: number) {
    const products = await this.productsService.getProductDataId(id);
    return products;
  }
  @Delete('/api/producto/:id') //borrar producto con el id
  async deleteProductId(@Param('id') id: number) {
    await this.productsService.deleteProductId(id);
    return { message: 'Producto eliminado con éxito' };
  }
  @Post('/api/producto') //anadir nuevos productos
  async registerNewProduct(@Body() newSupplier : Productos) {
    const products = await this.productsService.createNewProduct(newSupplier);
    return { message: 'Producto agregado con éxito' };
  }
  @Put('/api/producto/:id') //buscar al producto por el id y luego actualizar el dato de un producto
  async updateProductData(@Param('id') id: number, @Body() updatedProductData: Productos) {
    const updatedProduct = await this.productsService.updateProductData(id, updatedProductData);
    return { message: 'Datos Actualizados con éxito' };;
  }
  @Get('/api/producto/categoria/:categoriaId') // obtener productos por categoría
  async getProductsByCategory(@Param('categoriaId') categoriaId: number) {
    const products = await this.productsService.getProductsByCategory(categoriaId);
    return products;
  }
  @Get('/api/producto/proveedor/:proveedorId') // obtener productos por categoría
  async getProductsByProveedor(@Param('proveedorId') proveedorId: number) {
    const products = await this.productsService.getProductsByProveedor(proveedorId);
    return products;
  }
}
