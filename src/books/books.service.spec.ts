import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

describe('BooksService', () => {
  let service: BooksService;
  let repo: Repository<Book>;

  const mockBook = { id: 1, title: 'Clean Code', author: 'Robert Martin' };

  const mockRepository = {
    find: jest.fn().mockResolvedValue([mockBook]),
    findOne: jest.fn().mockResolvedValue(mockBook),
    create: jest.fn().mockReturnValue(mockBook),
    save: jest.fn().mockResolvedValue(mockBook),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repo = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it('debe retornar todos los libros', async () => {
    const books = await service.findAll();
    expect(books).toEqual([mockBook]);
  });

  it('debe crear un libro', async () => {
    const result = await service.create({ title: 'Clean Code', author: 'Bob' });
    expect(result).toEqual(mockBook);
    expect(repo.create).toHaveBeenCalled();
    expect(repo.save).toHaveBeenCalled();
  });
});
