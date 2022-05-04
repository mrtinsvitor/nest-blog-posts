import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsService } from './posts.service';

const fakePosts = [
  {
    id: 1,
    titulo: 'Primeiro post do blog',
    conteudo: 'Apenas um teste.',
    publicado: true,
    autor: 'João',
  },
  {
    id: 2,
    titulo: 'Testes unitários',
    conteudo: 'Conteúdo sobre testes unitários.',
    publicado: true,
    autor: 'Vitor',
  },
  {
    id: 3,
    titulo: 'Javascript',
    conteudo: 'Conteúdo sobre testes Javascript.',
    publicado: false,
    autor: 'Teste',
  },
];

const prismaMock = {
  post: {
    create: jest.fn().mockReturnValue(fakePosts[0]),
    findMany: jest.fn().mockResolvedValue(fakePosts),
    findUnique: jest.fn().mockResolvedValue(fakePosts[0]),
    update: jest.fn().mockResolvedValue(fakePosts[0]),
    delete: jest.fn(),
  },
};

describe('PostsService', () => {
  let service: PostsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it(`should return an array of posts`, async () => {
      const response = await service.findAll();

      expect(response).toEqual(fakePosts);
      expect(prisma.post.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.post.findMany).toHaveBeenCalledWith(/* nothing */);
    });
  });

  describe('findOne', () => {
    it(`should return a single post`, async () => {
      const response = await service.findOne(1);

      expect(response).toEqual(fakePosts[0]);
      expect(prisma.post.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.post.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it(`should return nothing when post is not found`, async () => {
      jest.spyOn(prisma.post, 'findUnique').mockResolvedValue(undefined);

      const response = await service.findOne(99);

      expect(response).toBeUndefined();
      expect(prisma.post.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.post.findUnique).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });

  describe('create', () => {
    it(`should create a new post`, async () => {
      const response = await service.create(fakePosts[0]);

      expect(response).toBe(fakePosts[0]);
      expect(prisma.post.create).toHaveBeenCalledTimes(1);
      expect(prisma.post.create).toHaveBeenCalledWith({
        data: fakePosts[0],
      });
    });
  });

  describe('updateOne', () => {
    it(`should update a post`, async () => {
      const response = await service.update(1, fakePosts[0]);

      expect(response).toEqual(fakePosts[0]);
      expect(prisma.post.update).toHaveBeenCalledTimes(1);
      expect(prisma.post.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: fakePosts[0],
      });
    });

    it(`should return NotFoundException when no post is found`, async () => {
      const unexistingPost = {
        id: 42,
        titulo: 'teste',
        conteudo: 'Conteudo Teste',
        publicado: false,
        autor: 'Teste',
      };

      jest.spyOn(prisma.post, 'update').mockRejectedValue(new Error());

      try {
        await service.update(42, unexistingPost);
      } catch (error) {
        expect(error).toEqual(new NotFoundException());
      }

      expect(prisma.post.update).toHaveBeenCalledWith({
        where: { id: 42 },
        data: unexistingPost,
      });
    });
  });

  describe('deleteOne', () => {
    it(`should delete post and return empty body`, async () => {
      expect(await service.remove(1)).toBeUndefined();
      expect(prisma.post.delete).toHaveBeenCalledTimes(1);
      expect(prisma.post.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it(`should return NotFoundException if post does not exist`, async () => {
      jest.spyOn(prisma.post, 'delete').mockRejectedValue(new Error());

      try {
        await service.remove(99);
      } catch (error) {
        expect(error).toEqual(new NotFoundException());
      }

      expect(prisma.post.delete).toHaveBeenCalledTimes(1);
      expect(prisma.post.delete).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });
});
