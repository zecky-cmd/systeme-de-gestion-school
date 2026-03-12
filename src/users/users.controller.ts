import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SanitizedUser, RoleUser } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Utilisateurs')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiResponse({ status: 201, description: 'Utilisateur créé' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 403, description: 'Interdit' })
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    if (!user) {
      throw new BadRequestException(
        "Erreur lors de la création de l'utilisateur",
      );
    }
    return {
      message: "Utilisateur créé avec succès",
      data: user,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.adm, RoleUser.dir, RoleUser.ens)
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  @ApiQuery({ name: 'role', required: false, enum: RoleUser })
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs' })
  @HttpCode(HttpStatus.OK)
  async findAll(@Query('role') role?: string) {
    const users = await this.usersService.findAll(role);
    if (!users) {
      throw new NotFoundException('Utilisateurs non trouvés');
    }
    return {
      message: "Liste des utilisateurs récupérée avec succès",
      data: users,
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Récupérer un utilisateur par ID' })
  @ApiResponse({ status: 200, description: 'Détails de l\'utilisateur' })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return {
      message: "Détails de l'utilisateur récupérés",
      data: user,
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  @ApiResponse({ status: 200, description: 'Mise à jour réussie' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return {
      message: "Utilisateur mis à jour avec succès",
      data: user,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.adm)
  @ApiOperation({ summary: 'Supprimer un utilisateur (Admin uniquement)' })
  @ApiResponse({ status: 200, description: 'Suppression réussie' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.remove(id);
    return {
      message: "Utilisateur supprimé avec succès",
      data: user,
    };
  }
}
