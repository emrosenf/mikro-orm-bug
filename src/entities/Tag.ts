import { Entity, PrimaryKey, Property } from 'mikro-orm';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Tag {

  @Field()
  @PrimaryKey({ type: 'text' })
  id: string;

  @Field({ nullable: true })
  @Property({ type: 'text', fieldName: 'name', nullable: true })
  name?: string;

}
