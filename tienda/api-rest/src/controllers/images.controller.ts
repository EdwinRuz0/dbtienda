import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ImagesService } from 'src/services/images.service';
import { Imagen } from 'src/models/images.model';

@Controller('api/imagenes')
export class ImagesController {
  constructor(private readonly imageService: ImagesService) {}

  @Post()
  async upImage(@Body() image: Imagen) {
    return await this.imageService.saveImage(image);
  }

  @Get(':id')
  async getImage(@Param('id') id: number) {
    return await this.imageService.getImageById(id);
  }
  @Put(':id')
    async updateImage(@Param('id') id: number, @Body() updatedImage: Imagen) {
    return await this.imageService.updateImage(id, updatedImage);
  }
  @Delete(':id')
    async deleteImage(@Param('id') id: number) {
    return await this.imageService.deleteImageId(id);
  }
}
