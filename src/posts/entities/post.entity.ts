import { Prisma } from '@prisma/client';

export class Post implements Prisma.PostUncheckedCreateInput {
  id?: number;
  titulo: string;
  conteudo?: string;
  publicado?: boolean;
  autor: string;

  constructor(partial: Partial<Post>) {
    Object.assign(this, partial);
  }
}
