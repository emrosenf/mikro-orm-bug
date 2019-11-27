import { Resolver, Query, Ctx, FieldResolver, Root, } from "type-graphql";

import { User } from "./entities/User";
import { Tag } from "./entities/Tag";
import { Context } from "./Context";

@Resolver(() => User)
class MeResolver {

  @Query(() => User, { nullable: true, complexity: 5 })
  async me(@Ctx() ctx: Context): Promise<User | null> {
    return ctx.em.findOne(User, {
      firstName: 'user-1',
    })
  }

  @FieldResolver(() => Tag)
  async tag(@Root() user: User, @Ctx() ctx: Context): Promise<Tag | null> {
    if (user.tag === undefined) {
      return null
    }
    return ctx.em.findOne(Tag, { id: user.tag.id})
  }

}

export default MeResolver