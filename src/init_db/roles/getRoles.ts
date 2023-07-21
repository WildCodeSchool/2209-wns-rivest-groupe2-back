import { DeepPartial } from "typeorm";
import { Role } from "../../entities/role";

const getRoles = (): Array<DeepPartial<Role>> => {
  return [
    {
      name: "free_user",
      description:
        "Connecté en free_user ! vous pouvez accéder au détail des POI, ajouter un commentaire et ajouter un commentaire ",
    },
    {
      name: "super_user",
      description: "Connecté en super_user ! Vous pouvez créer un POI",
    },
    {
      name: "city_admin",
      description:
        "Connecté en city_admin ! Vous pouvez créer, modifier, supprimer des POI et créer des super_user",
    },
    {
      name: "admin",
      description: "Connecté en admin ! You can safely drop the database ;)",
    },
  ];
};

export default getRoles;
