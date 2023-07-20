import { DeepPartial } from "typeorm";
import * as argon2 from "argon2";
import { User } from "../../entities/user";

const getUserInfos = async (): Promise<DeepPartial<User>> => {
  const password = "Admin1234";
  const hashedPassword = await argon2.hash(password);
  return {
    firstname: "Sample",
    lastname: "User",
    username: "sample.user",
    email: "sample.user@develop.com",
    hashedPassword,
    isVerified: true,
    uuid: "nbkjbkbkndnk151412253",
    role: {
      id: 1,
      name: "free_user",
      description:
        "Connecté en free_user ! vous pouvez accéder au détail des POI, ajouter un commentaire et ajouter un commentaire ",
    },
  };
};

export default getUserInfos;
