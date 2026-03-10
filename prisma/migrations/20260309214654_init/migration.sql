-- CreateEnum
CREATE TYPE "ModeEval" AS ENUM ('trim', 'sem');

-- CreateEnum
CREATE TYPE "StatutPeriode" AS ENUM ('ouv', 'clos', 'arch');

-- CreateEnum
CREATE TYPE "Cycle" AS ENUM ('col', 'lyc');

-- CreateEnum
CREATE TYPE "CycleMatiere" AS ENUM ('col', 'lyc', 'tous');

-- CreateEnum
CREATE TYPE "RoleUser" AS ENUM ('adm', 'dir', 'ens', 'par', 'elv');

-- CreateEnum
CREATE TYPE "StatutEnseignant" AS ENUM ('actif', 'inact');

-- CreateEnum
CREATE TYPE "Sexe" AS ENUM ('M', 'F');

-- CreateEnum
CREATE TYPE "LienParent" AS ENUM ('pere', 'mere', 'tuteur');

-- CreateEnum
CREATE TYPE "StatutInscription" AS ENUM ('ins', 'ab', 'exc');

-- CreateEnum
CREATE TYPE "TypeEvaluation" AS ENUM ('DS', 'comp', 'interro');

-- CreateEnum
CREATE TYPE "MentionBulletin" AS ENUM ('exc', 'bien', 'pass', 'aver');

-- CreateEnum
CREATE TYPE "JourCreneau" AS ENUM ('lun', 'mar', 'mer', 'jeu', 'ven', 'sam');

-- CreateEnum
CREATE TYPE "TypeAbsence" AS ENUM ('just', 'injust', 'retard');

-- CreateEnum
CREATE TYPE "ModePaiement" AS ENUM ('esp', 'mobile', 'cheque');

-- CreateEnum
CREATE TYPE "TypeSanction" AS ENUM ('aver', 'excl', 'cons');

-- CreateTable
CREATE TABLE "EtablissementConfig" (
    "id" SERIAL NOT NULL,
    "anneeActiveId" INTEGER,
    "nom" VARCHAR(150) NOT NULL,
    "adresse" TEXT,
    "telephone" VARCHAR(20),
    "email" VARCHAR(100),
    "logoUrl" VARCHAR(255),
    "devise" VARCHAR(10) DEFAULT 'FCFA',

    CONSTRAINT "EtablissementConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnneeScolaire" (
    "id" SERIAL NOT NULL,
    "libelle" VARCHAR(20) NOT NULL,
    "dateDebut" DATE NOT NULL,
    "dateFin" DATE NOT NULL,
    "modeEval" "ModeEval" NOT NULL DEFAULT 'trim',

    CONSTRAINT "AnneeScolaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Periode" (
    "id" SERIAL NOT NULL,
    "anneeId" INTEGER NOT NULL,
    "numero" SMALLINT NOT NULL,
    "libelle" VARCHAR(30) NOT NULL,
    "dateDebut" DATE NOT NULL,
    "dateFin" DATE NOT NULL,
    "statut" "StatutPeriode" NOT NULL DEFAULT 'ouv',
    "dateCloture" TIMESTAMP(3),

    CONSTRAINT "Periode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classe" (
    "id" SERIAL NOT NULL,
    "anneeId" INTEGER NOT NULL,
    "nom" VARCHAR(30) NOT NULL,
    "cycle" "Cycle" NOT NULL,
    "niveau" VARCHAR(15) NOT NULL,
    "serie" VARCHAR(5),
    "salle" VARCHAR(20),
    "capaciteMax" SMALLINT NOT NULL DEFAULT 60,

    CONSTRAINT "Classe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Matiere" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(80) NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "cycle" "CycleMatiere" NOT NULL DEFAULT 'tous',
    "couleur" VARCHAR(7),

    CONSTRAINT "Matiere_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "RoleUser" NOT NULL,
    "nom" VARCHAR(80),
    "prenom" VARCHAR(80),
    "estActif" BOOLEAN NOT NULL DEFAULT true,
    "derniereConnexion" TIMESTAMP(3),
    "tokenReset" VARCHAR(255),
    "tokenExpiry" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enseignant" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "matricule" VARCHAR(20),
    "specialite" VARCHAR(100),
    "telephone" VARCHAR(20),
    "statut" "StatutEnseignant" NOT NULL DEFAULT 'actif',

    CONSTRAINT "Enseignant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Eleve" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "matricule" VARCHAR(20),
    "dateNaissance" DATE,
    "lieuNaissance" VARCHAR(100),
    "sexe" "Sexe" NOT NULL,
    "nationalite" VARCHAR(50) DEFAULT 'Ivoirienne',
    "photoUrl" VARCHAR(255),

    CONSTRAINT "Eleve_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parent" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "telephone" VARCHAR(20),
    "lien" "LienParent" NOT NULL,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParentEleve" (
    "id" SERIAL NOT NULL,
    "parentId" INTEGER NOT NULL,
    "eleveId" INTEGER NOT NULL,
    "estTuteurLegal" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ParentEleve_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inscription" (
    "id" SERIAL NOT NULL,
    "anneeId" INTEGER NOT NULL,
    "eleveId" INTEGER NOT NULL,
    "classeId" INTEGER NOT NULL,
    "statut" "StatutInscription" NOT NULL DEFAULT 'ins',

    CONSTRAINT "Inscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatiereNiveau" (
    "id" SERIAL NOT NULL,
    "classeId" INTEGER NOT NULL,
    "matiereId" INTEGER NOT NULL,
    "enseignantId" INTEGER NOT NULL,
    "coefficient" DECIMAL(3,1) NOT NULL DEFAULT 1.0,
    "noteMax" DECIMAL(4,2) NOT NULL DEFAULT 20.00,

    CONSTRAINT "MatiereNiveau_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evaluation" (
    "id" SERIAL NOT NULL,
    "matiereNiveauId" INTEGER NOT NULL,
    "periodeId" INTEGER NOT NULL,
    "saisiParId" INTEGER NOT NULL,
    "titre" VARCHAR(100) NOT NULL,
    "type" "TypeEvaluation" NOT NULL,
    "dateEvaluation" DATE NOT NULL,
    "coefficient" DECIMAL(3,1) NOT NULL DEFAULT 1.0,
    "noteMax" DECIMAL(4,2) NOT NULL DEFAULT 20.00,

    CONSTRAINT "Evaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "eleveId" INTEGER NOT NULL,
    "evaluationId" INTEGER NOT NULL,
    "valeur" DECIMAL(4,2),
    "estAbsent" BOOLEAN NOT NULL DEFAULT false,
    "appreciation" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bulletin" (
    "id" SERIAL NOT NULL,
    "eleveId" INTEGER NOT NULL,
    "periodeId" INTEGER NOT NULL,
    "valideParId" INTEGER NOT NULL,
    "moyenneGenerale" DECIMAL(4,2),
    "rang" SMALLINT,
    "mention" "MentionBulletin",
    "appreciationGen" TEXT,
    "estPublie" BOOLEAN NOT NULL DEFAULT false,
    "pdfUrl" VARCHAR(255),
    "datePublication" TIMESTAMP(3),

    CONSTRAINT "Bulletin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Creneau" (
    "id" SERIAL NOT NULL,
    "matiereNiveauId" INTEGER NOT NULL,
    "jour" "JourCreneau" NOT NULL,
    "heureDebut" TIME NOT NULL,
    "heureFin" TIME NOT NULL,
    "salle" VARCHAR(20),

    CONSTRAINT "Creneau_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Absence" (
    "id" SERIAL NOT NULL,
    "eleveId" INTEGER NOT NULL,
    "creneauId" INTEGER,
    "saisiParId" INTEGER,
    "date" DATE NOT NULL,
    "type" "TypeAbsence" NOT NULL DEFAULT 'injust',
    "motif" TEXT,
    "notifEnvoyee" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Absence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RubriqueFinanciere" (
    "id" SERIAL NOT NULL,
    "anneeId" INTEGER NOT NULL,
    "libelle" VARCHAR(100) NOT NULL,
    "montant" DECIMAL(10,0) NOT NULL,
    "cycle" "CycleMatiere" NOT NULL DEFAULT 'tous',
    "estObligatoire" BOOLEAN NOT NULL DEFAULT true,
    "ordre" SMALLINT NOT NULL DEFAULT 1,

    CONSTRAINT "RubriqueFinanciere_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paiement" (
    "id" SERIAL NOT NULL,
    "eleveId" INTEGER NOT NULL,
    "rubriqueId" INTEGER NOT NULL,
    "encaisseParId" INTEGER NOT NULL,
    "montant" DECIMAL(10,0) NOT NULL,
    "datePaiement" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mode" "ModePaiement" NOT NULL,
    "reference" VARCHAR(50),
    "recuNum" VARCHAR(20),
    "pdfUrl" VARCHAR(255),

    CONSTRAINT "Paiement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sanction" (
    "id" SERIAL NOT NULL,
    "eleveId" INTEGER NOT NULL,
    "prononceParId" INTEGER NOT NULL,
    "type" "TypeSanction" NOT NULL,
    "motif" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "dureeJours" SMALLINT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sanction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "expediteurId" INTEGER NOT NULL,
    "destinataireId" INTEGER NOT NULL,
    "sujet" VARCHAR(200) NOT NULL,
    "corps" TEXT NOT NULL,
    "lu" BOOLEAN NOT NULL DEFAULT false,
    "dateEnvoi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" BIGSERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "action" VARCHAR(60) NOT NULL,
    "entite" VARCHAR(50) NOT NULL,
    "entiteId" INTEGER,
    "detail" JSONB,
    "ip" VARCHAR(45),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EtablissementConfig_anneeActiveId_key" ON "EtablissementConfig"("anneeActiveId");

-- CreateIndex
CREATE UNIQUE INDEX "Matiere_code_key" ON "Matiere"("code");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Enseignant_userId_key" ON "Enseignant"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Enseignant_matricule_key" ON "Enseignant"("matricule");

-- CreateIndex
CREATE UNIQUE INDEX "Eleve_userId_key" ON "Eleve"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Eleve_matricule_key" ON "Eleve"("matricule");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_userId_key" ON "Parent"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ParentEleve_parentId_eleveId_key" ON "ParentEleve"("parentId", "eleveId");

-- CreateIndex
CREATE UNIQUE INDEX "Inscription_anneeId_eleveId_key" ON "Inscription"("anneeId", "eleveId");

-- CreateIndex
CREATE UNIQUE INDEX "MatiereNiveau_classeId_matiereId_key" ON "MatiereNiveau"("classeId", "matiereId");

-- CreateIndex
CREATE UNIQUE INDEX "Note_eleveId_evaluationId_key" ON "Note"("eleveId", "evaluationId");

-- CreateIndex
CREATE UNIQUE INDEX "Bulletin_eleveId_periodeId_key" ON "Bulletin"("eleveId", "periodeId");

-- CreateIndex
CREATE UNIQUE INDEX "Paiement_recuNum_key" ON "Paiement"("recuNum");

-- AddForeignKey
ALTER TABLE "EtablissementConfig" ADD CONSTRAINT "EtablissementConfig_anneeActiveId_fkey" FOREIGN KEY ("anneeActiveId") REFERENCES "AnneeScolaire"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Periode" ADD CONSTRAINT "Periode_anneeId_fkey" FOREIGN KEY ("anneeId") REFERENCES "AnneeScolaire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classe" ADD CONSTRAINT "Classe_anneeId_fkey" FOREIGN KEY ("anneeId") REFERENCES "AnneeScolaire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enseignant" ADD CONSTRAINT "Enseignant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eleve" ADD CONSTRAINT "Eleve_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentEleve" ADD CONSTRAINT "ParentEleve_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentEleve" ADD CONSTRAINT "ParentEleve_eleveId_fkey" FOREIGN KEY ("eleveId") REFERENCES "Eleve"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscription" ADD CONSTRAINT "Inscription_anneeId_fkey" FOREIGN KEY ("anneeId") REFERENCES "AnneeScolaire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscription" ADD CONSTRAINT "Inscription_eleveId_fkey" FOREIGN KEY ("eleveId") REFERENCES "Eleve"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscription" ADD CONSTRAINT "Inscription_classeId_fkey" FOREIGN KEY ("classeId") REFERENCES "Classe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatiereNiveau" ADD CONSTRAINT "MatiereNiveau_classeId_fkey" FOREIGN KEY ("classeId") REFERENCES "Classe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatiereNiveau" ADD CONSTRAINT "MatiereNiveau_matiereId_fkey" FOREIGN KEY ("matiereId") REFERENCES "Matiere"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatiereNiveau" ADD CONSTRAINT "MatiereNiveau_enseignantId_fkey" FOREIGN KEY ("enseignantId") REFERENCES "Enseignant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_matiereNiveauId_fkey" FOREIGN KEY ("matiereNiveauId") REFERENCES "MatiereNiveau"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_periodeId_fkey" FOREIGN KEY ("periodeId") REFERENCES "Periode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_saisiParId_fkey" FOREIGN KEY ("saisiParId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_eleveId_fkey" FOREIGN KEY ("eleveId") REFERENCES "Eleve"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_evaluationId_fkey" FOREIGN KEY ("evaluationId") REFERENCES "Evaluation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bulletin" ADD CONSTRAINT "Bulletin_eleveId_fkey" FOREIGN KEY ("eleveId") REFERENCES "Eleve"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bulletin" ADD CONSTRAINT "Bulletin_periodeId_fkey" FOREIGN KEY ("periodeId") REFERENCES "Periode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bulletin" ADD CONSTRAINT "Bulletin_valideParId_fkey" FOREIGN KEY ("valideParId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Creneau" ADD CONSTRAINT "Creneau_matiereNiveauId_fkey" FOREIGN KEY ("matiereNiveauId") REFERENCES "MatiereNiveau"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_eleveId_fkey" FOREIGN KEY ("eleveId") REFERENCES "Eleve"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_creneauId_fkey" FOREIGN KEY ("creneauId") REFERENCES "Creneau"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_saisiParId_fkey" FOREIGN KEY ("saisiParId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RubriqueFinanciere" ADD CONSTRAINT "RubriqueFinanciere_anneeId_fkey" FOREIGN KEY ("anneeId") REFERENCES "AnneeScolaire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paiement" ADD CONSTRAINT "Paiement_eleveId_fkey" FOREIGN KEY ("eleveId") REFERENCES "Eleve"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paiement" ADD CONSTRAINT "Paiement_rubriqueId_fkey" FOREIGN KEY ("rubriqueId") REFERENCES "RubriqueFinanciere"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paiement" ADD CONSTRAINT "Paiement_encaisseParId_fkey" FOREIGN KEY ("encaisseParId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sanction" ADD CONSTRAINT "Sanction_eleveId_fkey" FOREIGN KEY ("eleveId") REFERENCES "Eleve"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sanction" ADD CONSTRAINT "Sanction_prononceParId_fkey" FOREIGN KEY ("prononceParId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_expediteurId_fkey" FOREIGN KEY ("expediteurId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_destinataireId_fkey" FOREIGN KEY ("destinataireId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
