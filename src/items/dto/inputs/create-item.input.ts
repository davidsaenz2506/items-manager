import { InputType, Field, Float } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreateItemInput {
  @Field(() => String, {
    name: 'name',
    description: 'Name of the item',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  name: string;

  @Field(() => Float, {
    name: 'quantity',
    description: 'The item quantity',
    nullable: false,
  })
  @IsPositive()
  quantity: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  quantityUnits?: string;
}
