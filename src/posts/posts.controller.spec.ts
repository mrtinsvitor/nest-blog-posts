import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
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

const serviceMock = {
  findAll: jest.fn().mockResolvedValue(fakePosts),
  findOne: jest.fn().mockReturnValue(fakePosts[0]),
  create: jest.fn().mockReturnValue(fakePosts[0]),
  update: jest.fn().mockReturnValue(fakePosts[0]),
  remove: jest.fn(),
};

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [{ provide: PostsService, useValue: serviceMock }],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const response = await controller.findAll();

      expect(service.findAll).toBeCalledTimes(1);
      expect(response).toEqual(fakePosts);
    });
  });

  describe('create', () => {
    it('should create a post and return', async () => {
      const response = await controller.create(fakePosts[0]);

      expect(service.create).toBeCalledWith(fakePosts[0]);
      expect(response).toEqual(fakePosts[0]);
    });
  });

  describe('findOne', () => {
    it('should return one post', async () => {
      const response = await controller.findOne('1');

      expect(service.findOne).toBeCalledWith(1);
      expect(response).toEqual(fakePosts[0]);
    });
  });

  describe('update', () => {
    it('should update a post', async () => {
      const response = await controller.update('1', fakePosts[0]);

      expect(service.update).toBeCalledWith(1, fakePosts[0]);
      expect(response).toEqual(fakePosts[0]);
    });
  });

  describe('remove', () => {
    it('should remove a post', async () => {
      const response = await controller.remove('1');

      expect(service.remove).toBeCalledWith(1);
      expect(response).toBeUndefined();
    });
  });
});
