-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT,
    "publicado" BOOLEAN DEFAULT false,
    "autor" TEXT NOT NULL
);
