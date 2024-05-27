import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { Auditoria } from 'src/models/auditory.model';
import { AuditoryService } from 'src/services/auditory.service';
@Controller('/api/auditoria')
export class AuditoryController {
constructor(private readonly auditoryService: AuditoryService) {}
@Get()
  async getAllAuditory() { //obtener todos los datos de la auditoria
    const auditory = await this.auditoryService.getAllAuditory();
    return auditory;
  } 
  @Get(':tabla') //obtener todos los datos de las auditoria por el tabla
  async getAuditoryDataTable(@Param('tabla') tabla: string) {
    const auditory = await this.auditoryService.getAuditoryDataTable(tabla);
    return auditory;
  }
  @Get(':op') //obtener todos los datos de las auditoria por el tabla
  async getAuditoryDataOperacion(@Param('op') op: string) {
    const auditory = await this.auditoryService.getAuditoryDataTable(op);
    return auditory;
  }
}