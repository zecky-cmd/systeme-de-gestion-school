import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ClasseController } from './classe/classe.controller';
import { ClasseModule } from './classe/classe.module';
import { MatiereController } from './matiere/matiere.controller';
import { MatiereModule } from './matiere/matiere.module';
import { EleveService } from './eleve/eleve.service';
import { EleveController } from './eleve/eleve.controller';
import { EleveModule } from './eleve/eleve.module';
import { AnneeScolaireModule } from './annee-scolaire/annee-scolaire.module';
import { EtablissementConfigService } from './etablissement_config/etablissement_config.service';
import { EtablissementConfigModule } from './etablissement_config/etablissement_config.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // 100 requêtes max par minute
      },
    ]),
    DatabaseModule,
    UsersModule,
    AuthModule,
    ClasseModule,
    MatiereModule,
    EleveModule,
    AnneeScolaireModule,
    EtablissementConfigModule,
  ],
  controllers: [AppController, ClasseController, MatiereController, EleveController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    EleveService,
    EtablissementConfigService,
  ],
})
export class AppModule {}
