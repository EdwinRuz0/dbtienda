//categories.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Categorias } from 'src/models/categories.model';

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Categorias) private categoriesRepository: Repository<Categorias>){
        
    }
    async getAllCategories(): Promise<Categorias[]> {
        return await this.categoriesRepository.find();
    }
    async getCategoriesDataId(id: number): Promise<Categorias>{
        const categoryDoc = await this.categoriesRepository.findOneBy({id: id})
        if (!categoryDoc) {
            throw new ConflictException('Categoria no encontrada');
        }
        return categoryDoc;
    }
    async deleteCategoryId(id: number): Promise<void> {
        const categories = await this.categoriesRepository.findOneBy({id: id});
        if (!categories) {
          throw new ConflictException('Categoria no encontrada');
        }
        await this.categoriesRepository.remove(categories);
    }

    async createNewCategory(newCategory: Categorias): Promise<Categorias> {
      const lastCategoryId = await this.categoriesRepository
        .createQueryBuilder('categorias')
        .select('MAX(categorias.id)', 'maxId')
        .getRawOne();
      const newCategoryId = lastCategoryId.maxId ? lastCategoryId.maxId + 1 : 1;
      newCategory.id =  newCategoryId;
      const category = this.categoriesRepository.create({
        id: newCategory.id,
        NombreCategoria: newCategory.NombreCategoria,
        Descripcion: newCategory.Descripcion,
        ImagenID: newCategory.ImagenID || null,
      });
      await this.categoriesRepository.save(category);
      return category;
    }
    async updateCategoryData(id: number, updatedCategory: Partial<Categorias>): Promise<Categorias> {
      const categories = await this.categoriesRepository.findOneBy({id: id});
      if (!categories) {
        throw new ConflictException('Categoria no encontrada');
      }
      if (updatedCategory.NombreCategoria) {
        categories.NombreCategoria = updatedCategory.NombreCategoria;
      }
      if (updatedCategory.Descripcion) {
        categories.Descripcion = updatedCategory.Descripcion;
      }
      if (updatedCategory.ImagenID !== undefined) {
        categories.ImagenID = updatedCategory.ImagenID;
      }
      await this.categoriesRepository.save(categories);
      return categories;
    }
}
