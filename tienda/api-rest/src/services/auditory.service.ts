import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Auditoria } from 'src/models/auditory.model';

@Injectable()
export class AuditoryService {
    constructor(@InjectRepository(Auditoria) private auditoryRepository: Repository<Auditoria>){
        
    }
    async getAllAuditory(): Promise<Auditoria[]> {
        return await this.auditoryRepository.find();
    }
    async getAuditoryDataTable(tabla: string): Promise<Auditoria[]>{
        const auditoryDoc = await this.auditoryRepository.find({where:{NombreTabla:tabla}})
        if (!auditoryDoc) {
            throw new ConflictException('Auditoria de tabla no encontrada');
        }
        return auditoryDoc;
    }
    async getAuditoryDataOperacion(op: string): Promise<Auditoria[]>{
        const auditoryDoc = await this.auditoryRepository.find({where:{Operacion:op}})
        if (!auditoryDoc) {
            throw new ConflictException('Operación no encontrada');
        }
        return auditoryDoc;
    }
}