import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { RoleUser } from '../../users/entities/user.entity';

export class RegisterDto {
  @IsOptional()
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @MaxLength(80, { message: 'Le nom doit contenir au plus 80 caractères' })
  nom?: string;

  @IsOptional()
  @IsString({ message: 'Le prénom doit être une chaîne de caractères' })
  @MaxLength(80, { message: 'Le prénom doit contenir au plus 80 caractères' })
  prenom?: string;

  @IsNotEmpty({ message: "L'email est requis" })
  @IsEmail({}, { message: "L'email doit être une adresse email valide" })
  email: string;

  @IsNotEmpty({ message: 'Le mot de passe est requis' })
  @IsString({ message: 'Le mot de passe doit être une chaîne de caractères' })
  @MinLength(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères',
  })
  @MaxLength(50, {
    message: 'Le mot de passe doit contenir au plus 50 caractères',
  })
  password: string;

  @IsOptional()
  @IsEnum(RoleUser, {
    message: 'Le rôle doit être un des rôles valides(adm, dir, ens, par, elv)',
  })
  role?: (typeof RoleUser)[keyof typeof RoleUser];
}
