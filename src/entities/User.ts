import { Cascade, Entity, ManyToOne, PrimaryKey, Property, IdentifiedReference } from 'mikro-orm';
import { Field, ObjectType, } from 'type-graphql';
import { Tag } from './Tag';

@ObjectType()
@Entity()
export class User {

  @Field({ nullable: true })
  @Property({ type: 'text', fieldName: 'firstName', nullable: true })
  firstName?: string;

  @Field()
  @PrimaryKey({ type: 'text' })
  id: string;

  @Field(() => Tag, { nullable: true })
  @ManyToOne({ entity: () => Tag, fieldName: 'tag', cascade: [Cascade.MERGE], nullable: true })
  tag?: IdentifiedReference<Tag>;

}
