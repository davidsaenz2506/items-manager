import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ItemsResolver, ItemsService],
})
export class ItemsModule {}
