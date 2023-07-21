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
      id: 4,
      name: "admin",
      description: "Connecté en admin ! You can safely drop the database ;)",
    },
  };
};

export default getUserInfos;
