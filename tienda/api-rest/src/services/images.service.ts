import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Imagen } from 'src/models/images.model';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Imagen)
    private readonly imageRepository: Repository<Imagen>,
  ) {}

  async saveImage(image: Imagen): Promise<Imagen> {
    return await this.imageRepository.save(image);
  }

  async getImageById(id: number): Promise<Imagen | null> {
    return await this.imageRepository.findOne({ where: { ImagenID: id } });
  }
  async updateImage(ImagenID: number, updatedImage: Imagen): Promise<any> {
    const image = await this.imageRepository.findOne({ where: { ImagenID } });
  
    if (!image) {
      throw new ConflictException('Imagen no encontrado');
    }
  
    image.NombreImagen = updatedImage.NombreImagen;
    image.Extension = updatedImage.Extension;
    image.DataBase64 = updatedImage.DataBase64;
    image.Referencia = updatedImage.Referencia;
  
    return await this.imageRepository.save(image);
  }
  async deleteImageId(ImagenID: number): Promise<void> {
    const image = await this.imageRepository.findOneBy({ImagenID: ImagenID});
    if (!image) {
      throw new ConflictException('Imagen no encontrado');
    }
    await this.imageRepository.remove(image);   
  }
}
