import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleUser } from '../users/entities/user.entity';

@ApiTags('Messagerie')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiOperation({ summary: 'Envoyer un nouveau message' })
  @ApiResponse({ status: 201, description: 'Message envoyé' })
  create(@Body() dto: CreateMessageDto) {
    return this.messageService.create(dto);
  }

  @Get('sent/:userId')
  @ApiOperation({ summary: 'Récupérer les messages envoyés par un utilisateur' })
  findSent(@Param('userId', ParseIntPipe) userId: number) {
    return this.messageService.findSent(userId);
  }

  @Get('received/:userId')
  @ApiOperation({ summary: 'Récupérer les messages reçus par un utilisateur' })
  findReceived(@Param('userId', ParseIntPipe) userId: number) {
    return this.messageService.findReceived(userId);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Marquer un message comme lu' })
  markAsRead(@Param('id', ParseIntPipe) id: number) {
    return this.messageService.markAsRead(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un message' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.messageService.remove(id);
  }
}
