import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ActivityLogService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: { userId: number; action: string; entite: string; entiteId?: number; detail?: any; ip?: string }) {
    return this.databaseService.activityLog.create({
      data: {
        ...data,
        detail: data.detail ? JSON.stringify(data.detail) : undefined,
      } as any,
    });
  }

  async findAll() {
    return this.databaseService.activityLog.findMany({
      take: 100,
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    });
  }
}
