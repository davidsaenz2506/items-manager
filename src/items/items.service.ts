import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemInput } from './dto/inputs/create-item.input';
import { UpdateItemInput } from './dto/inputs/update-item.input';
import { Item } from './entities/item.entity';
import { PostgreItemRepository } from 'src/database/repository/item.repository';

@Injectable()
export class ItemsService {
  constructor(
    @Inject('ITEM_POSTGRE_REPOSITORY')
    private readonly itemRepository: PostgreItemRepository,
  ) {}

  async create(createItemInput: CreateItemInput): Promise<Item> {
    return await this.itemRepository.create(createItemInput);
  }

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.list();
  }

  async findOne(id: string) {
    const item = await this.itemRepository.findById(id);

    if (!item)
      throw new NotFoundException(
        `The object with Id = ${id} is not found in the registry`,
      );

    return item;
  }

  async update(updateItemInput: UpdateItemInput): Promise<Item> {
    const updatedItem: Item = await this.itemRepository.update(updateItemInput);
    return updatedItem;
  }

  async remove(id: string): Promise<string> {
    const item = await this.findOne(id);

    if (item) await this.itemRepository.delete(id);

    return `Deletion for element with Id = ${id} successful`;
  }
}
