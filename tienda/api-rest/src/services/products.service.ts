//products.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Productos } from 'src/models/products.model';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Productos) private productosRepository: Repository<Productos>){
        
    }
    async getAllProducts(): Promise<Productos[]> {
        return await this.productosRepository.find();
    }
    async getProductDataId(id: number): Promise<Productos>{
        const productsDoc = await this.productosRepository.findOneBy({ProductoID: id})
        if (!productsDoc) {
            throw new ConflictException('Producto no encontrado');
        }
        return productsDoc;
    }
    async deleteProductId(id: number): Promise<void> {
        const products = await this.productosRepository.findOneBy({ProductoID: id});
        if (!products) {
          throw new ConflictException('Proveedor no encontrado');
        }
        await this.productosRepository.remove(products);
    }

    async createNewProduct(newProduct: Productos): Promise<Productos> {
      const lastProductId = await this.productosRepository
        .createQueryBuilder('productos')
        .select('MAX(productos.ProductoID)', 'maxId')
        .getRawOne();
      const newProductId = lastProductId.maxId ? lastProductId.maxId + 1 : 1;
      newProduct.ProductoID =  newProductId;
      const products = this.productosRepository.create({
        ProductoID: newProduct.ProductoID,
        NombreProducto: newProduct.NombreProducto,
        Descripcion: newProduct.Descripcion,
        Precio: newProduct.Precio,
        CantidadEnStock: newProduct.CantidadEnStock,
        CategoriaID: newProduct.CategoriaID,
        ProveedorID: newProduct.ProveedorID,
        ImagenID: newProduct.ImagenID || null,
      });
      await this.productosRepository.save(products);
      return products;
    }
    async updateProductData(id: number, updatedProduct: Partial<Productos>): Promise<Productos> {
      const products = await this.productosRepository.findOneBy({ProductoID: id});
      if (!products) {
        throw new ConflictException('Producto no encontrado');
      }
      if (updatedProduct.NombreProducto) {
        products.NombreProducto = updatedProduct.NombreProducto;
      }
      if (updatedProduct.Descripcion) {
        products.Descripcion = updatedProduct.Descripcion;
      }
      if (updatedProduct.Precio) {
        products.Precio = updatedProduct.Precio;
      }
      if (updatedProduct.CantidadEnStock) {
        products.CantidadEnStock = updatedProduct.CantidadEnStock;
      }
      if (updatedProduct.CategoriaID) {
        products.CategoriaID = updatedProduct.CategoriaID;
      }
      if (updatedProduct.ProveedorID) {
        products.ProveedorID = updatedProduct.ProveedorID;
      }
      if (updatedProduct.ImagenID !== undefined) {
        products.ImagenID = updatedProduct.ImagenID;
      }
      await this.productosRepository.save(products);
      return products;
    }

    async getProductsByCategory(categoriaId: number): Promise<Productos[]> {
      const products = await this.productosRepository.find({where: { CategoriaID: categoriaId },});
      if (!products) {
        throw new ConflictException('No se encontraron productos para la categoría especificada');
      }
      return products;
    }
    async getProductsByProveedor(proveedorId: number): Promise<Productos[]> {
      const products = await this.productosRepository.find({where: { ProveedorID: proveedorId },});
      if (!products) {
        throw new ConflictException('No se encontraron productos para el proveedor especificado');
      }
      return products;
    }
}
