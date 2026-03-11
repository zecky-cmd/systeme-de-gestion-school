import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateMessageDto) {
    return this.databaseService.message.create({
      data: dto,
      include: { expediteur: true, destinataire: true },
    });
  }

  async findSent(userId: number) {
    return this.databaseService.message.findMany({
      where: { expediteurId: userId },
      orderBy: { dateEnvoi: 'desc' },
    });
  }

  async findReceived(userId: number) {
    return this.databaseService.message.findMany({
      where: { destinataireId: userId },
      orderBy: { dateEnvoi: 'desc' },
    });
  }

  async markAsRead(id: number) {
    return this.databaseService.message.update({
      where: { id },
      data: { lu: true },
    });
  }

  async remove(id: number) {
    try {
      return await this.databaseService.message.delete({ where: { id } });
    } catch (error: any) {
      if (error.code === 'P2025') throw new NotFoundException(`Message ${id} non trouvé`);
      throw error;
    }
  }
}
