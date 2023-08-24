import { DeepPartial } from "typeorm";
import * as argon2 from "argon2";
import { User } from "../../entities/user";

const getUserInfos = async (): Promise<DeepPartial<User[]>> => {
  const passwordAdmin = "Admin1234!";
  const hashedPasswordAdmin = await argon2.hash(passwordAdmin);
  const passwordCity = "City1234!";
  const hashedPasswordCity = await argon2.hash(passwordCity);
  const passwordSuper = "Super1234!";
  const hashedPasswordSuper = await argon2.hash(passwordSuper);
  const passwordFree = "Free1234!";
  const hashedPasswordFree = await argon2.hash(passwordFree);
  return [
    {
      firstname: "Sample",
      lastname: "User",
      username: "sample.user",
      email: "sample.user@develop.com",
      hashedPassword: hashedPasswordAdmin,
      isVerified: true,
      uuid: "nbkjbkbkndnk151412253",
      role: {
        id: 4,
        name: "admin",
        description: "Connecté en admin ! You can safely drop the database ;)",
      },
    },
    {
      firstname: "City",
      lastname: "Admin",
      username: "city.admin",
      email: "city.admin@develop.com",
      hashedPassword: hashedPasswordCity,
      isVerified: true,
      uuid: "nbkjfggdgbfdrjuk151412253",
      role: {
        id: 3,
        name: "city_admin",
        description:
          "Connecté en city_admin ! Vous pouvez créer, modifier, supprimer des POI et créer des super_user",
      },
    },
    {
      firstname: "Super",
      lastname: "User",
      username: "super.user",
      email: "super.user@develop.com",
      hashedPassword: hashedPasswordSuper,
      isVerified: true,
      uuid: "nbkjfezetjdvbedrjiu151412253",
      role: {
        id: 2,
        name: "super_user",
        description: "Connecté en super_user ! Vous pouvez créer un POI",
      },
    },
    {
      firstname: "Free",
      lastname: "User",
      username: "free.user",
      email: "free.user@develop.com",
      hashedPassword: hashedPasswordFree,
      isVerified: true,
      uuid: "nbkjrehjukxvsdjkk151412253",
      role: {
        id: 1,
        description:
          "Connecté en free_user ! vous pouvez accéder au détail des POI, ajouter un commentaire et ajouter un commentaire ",
      },
    },
  ];
};

export default getUserInfos;
