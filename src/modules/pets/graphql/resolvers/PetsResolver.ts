import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { User } from "../../../users/database/entities/User";
import { Pet } from "../../database/entities/Pet";

@Resolver(Pet)
export class PetsResolver {

  @Query(() => [Pet])
  async getPets(): Promise<Pet[]> {
    return Pet.find();
  }

  @Mutation(() => Pet)
  async createPet(
    @Arg('name') name: string,
    @Arg('userId') userId: string
  ): Promise<Pet> {
    const pet = Object.assign(new Pet(), {
      name,
      userId
    });

    await Pet.save(pet);

    return pet;
  }

  @FieldResolver(() => User)
  async user(
    @Root() root: Pet
  ): Promise<User> {
    return User.findOneOrFail({
      where: {
        id: root.userId
      }
    });
  }
}