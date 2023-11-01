//categories.controller.ts
import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { Categorias } from 'src/models/categories.model';
import { Usuarios } from 'src/models/users.model';
import { CategoriesService } from 'src/services/categories.service';
@Controller()
export class CategoriesController {
constructor(private readonly categoriesService: CategoriesService) {}
@Get('/api/categoria')
  async getAllCategories() { //obtener todos los datos de todos los usuarios
    const categories = await this.categoriesService.getAllCategories();
    return categories;
  } 
  @Get('/api/categoria/:id') //obtener todos los datos del usuario por el id
  async getCategoriesDataId(@Param('id') id: number) {
    const categories = await this.categoriesService.getCategoriesDataId(id);
    return categories;
  }
  @Delete('/api/categoria/:id') //borrar usuario con el id
  async deleteCategoryId(@Param('id') id: number) {
    await this.categoriesService.deleteCategoryId(id);
    return { message: 'Categoria eliminada con éxito' };
  }
  @Post('/api/categoria') //anadir nuevos usuarios
  async registerNewCategory(@Body() newCategory : Categorias) {
    const categories = await this.categoriesService.createNewCategory(newCategory);
    return { message: 'Categoria agregada con éxito' };
  }
  @Put('/api/categoria/:id') //buscar al usuario por el id y luego actualizar el dato de un usurio
  async updateCategoryData(@Param('id') id: number, @Body() updatedCategoryData: Categorias) {
    const updatedCategory = await this.categoriesService.updateCategoryData(id, updatedCategoryData);
    return { message: 'Datos Actualizados con éxito' };;
  }
}
