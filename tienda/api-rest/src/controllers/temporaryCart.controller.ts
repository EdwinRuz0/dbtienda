import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CarritoTemporal } from 'src/models/temporaryCart.model';
import { TemporaryCartService } from 'src/services/temporaryCart.service';

@Controller('api/cart')
export class TemporaryCartController {
  constructor(private readonly temporaryCartService: TemporaryCartService) {}

  @Post()
  async createCart(@Body() cart: CarritoTemporal) {
    return await this.temporaryCartService.saveCart(cart);
  }

  @Get(':id')
  async getCart(@Param('id') id: number) {
    return await this.temporaryCartService.getCartById(id);
  }
  @Get('user/:id')
  async getCartByUserId(@Param('id') id: number) { 
    return await this.temporaryCartService.getCartByUserId(id);
  }
  @Put(':id')
    async updatecart(@Param('id') id: number, @Body() updatedCart: CarritoTemporal) {
    return await this.temporaryCartService.updateCart(id, updatedCart);
  }
  @Delete(':id')
    async deleteCart(@Param('id') id: number) {
    return await this.temporaryCartService.deleteCartId(id);
  }
  @Delete('vaciar/:userId')
  async deleteAllCart(@Param('userId') id: number) {
    return await this.temporaryCartService.deleteAllCartByUser(id);
  }
}
