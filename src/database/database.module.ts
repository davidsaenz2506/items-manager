import { Module, Provider } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { DataSource } from 'typeorm';
import { Item } from 'src/items/entities/item.entity';
import { PostgreItemRepository } from './repository/item.repository';

const itemProvider: Provider[] = [
  {
    provide: 'ITEM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Item),
    inject: ['DATA_SOURCE'],
  },
];

const repositoryProvider: Provider[] = [
  {
    provide: 'ITEM_POSTGRE_REPOSITORY',
    useClass: PostgreItemRepository,
  },
];

@Module({
  providers: [...databaseProviders, ...itemProvider, ...repositoryProvider],
  exports: [...databaseProviders, ...repositoryProvider],
})
export class DatabaseModule {}
