import { Inject, Injectable } from '@nestjs/common';
import { CreateItemInput } from 'src/items/dto/inputs/create-item.input';
import { UpdateItemInput } from 'src/items/dto/inputs/update-item.input';
import { Item } from 'src/items/entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostgreItemRepository {
  constructor(
    @Inject('ITEM_REPOSITORY') private itemRepository: Repository<Item>,
  ) {}

  async list(): Promise<Item[]> {
    const listItems: Item[] = await this.itemRepository.find();
    return listItems;
  }

  async findById(id: string): Promise<Item> {
    const item: Item = await this.itemRepository.findOne({
      where: {
        id,
      },
    });

    return item;
  }

  async create(createItemInput: CreateItemInput): Promise<Item> {
    const newItem: Item = this.itemRepository.create(createItemInput);
    return await this.itemRepository.save(newItem);
  }

  async update(updateItemInput: UpdateItemInput): Promise<Item> {
    const item: Item = await this.itemRepository.preload(updateItemInput);
    return await this.itemRepository.save(item);
  }

  async delete(id: string): Promise<void> {
    await this.itemRepository.delete({
      id,
    });
  }
}
