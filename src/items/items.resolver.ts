import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { CreateItemInput } from './dto/inputs/create-item.input';
import { UpdateItemInput } from './dto/inputs/update-item.input';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item)
  async createItem(
    @Args('createItemInput') createItemInput: CreateItemInput,
  ): Promise<Item> {
    return await this.itemsService.create(createItemInput);
  }

  @Query(() => [Item])
  async findAll() {
    return await this.itemsService.findAll();
  }

  @Query(() => Item)
  async findOne(@Args('id', { type: () => String }, ParseUUIDPipe) id: string) {
    return await this.itemsService.findOne(id);
  }

  @Mutation(() => Item)
  async updateItem(
    @Args('updateItemInput') updateItemInput: UpdateItemInput,
  ): Promise<Item> {
    return await this.itemsService.update(updateItemInput);
  }

  @Mutation(() => String)
  removeItem(@Args('id', { type: () => String }) id: string) {
    return this.itemsService.remove(id);
  }
}
