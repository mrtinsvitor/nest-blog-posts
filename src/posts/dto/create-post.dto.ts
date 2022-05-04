import { Post } from '../entities/post.entity';

export class CreatePostDto extends Post {
  titulo: string;
  conteudo?: string;
  publicado?: boolean;
  autor: string;
}
