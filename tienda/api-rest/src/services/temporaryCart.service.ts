import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarritoTemporal } from 'src/models/temporaryCart.model';
import { Repository } from 'typeorm';

@Injectable()
export class TemporaryCartService {
  constructor(
    @InjectRepository(CarritoTemporal)
    private readonly temporaryCartRepository: Repository<CarritoTemporal>,
  ) {}

  async saveCart(cart: CarritoTemporal): Promise<CarritoTemporal> {
    return await this.temporaryCartRepository.save(cart);
  }

  async getCartById(id: number): Promise<CarritoTemporal | null> {
    return await this.temporaryCartRepository.findOne({ where: { CarritoID: id } });
  }
  async getCartByUserId(id: number): Promise<CarritoTemporal[]> {
    return await this.temporaryCartRepository.find({ where: { UsuarioID: id } });
  }
  async updateCart(CarritoID: number, updatedCart: CarritoTemporal): Promise<any> {
    const cart = await this.temporaryCartRepository.findOne({ where: { CarritoID } });
  
    if (!cart) {
      throw new ConflictException('Carrito no encontrado');
    }
  
    cart.UsuarioID = updatedCart.UsuarioID;
    cart.ProductoID = updatedCart.ProductoID;
    cart.Cantidad = updatedCart.Cantidad;
    cart.FechaAgregado = updatedCart.FechaAgregado;
  
    return await this.temporaryCartRepository.save(cart);
  }
  async deleteCartId(ImagenID: number): Promise<void> {
    const cart = await this.temporaryCartRepository.findOneBy({CarritoID: ImagenID});
    if (!cart) {
      throw new ConflictException('Carrito no encontrado');
    }
    await this.temporaryCartRepository.remove(cart);   
  }
}
