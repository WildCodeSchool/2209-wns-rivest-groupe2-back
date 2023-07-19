import { MigrationInterface, QueryRunner } from "typeorm";
import { Role } from "../entities/role";
import dataSource from "../utils/datasource";
import getRoles from "../init_db/roles/getRoles";
import { User } from "../entities/user";
import getUserInfos from "../init_db/users/getUserInfos";
import { PointOfInterest } from "../entities/pointOfInterest";
import { City } from "../entities/city";
import getCities from "../init_db/cities/getCities";
import getPois from "../init_db/pois/getPois";

export class PopulateInitDb implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const roleRepository = dataSource.getRepository(Role);
    const roles = await roleRepository.find();

    // always set roles table
    if (roles.length !== 4) {
      await roleRepository.delete({});
      const allRoles = getRoles();
      const roleObjects = allRoles.map((role) => roleRepository.create(role));
      await roleRepository.save(roleObjects);
    }

    // always a sample user
    const userRepository = dataSource.getRepository(User);
    const sampleUser = await userRepository.findOneBy({
      email: "sample.user@develop.com",
    });

    if (sampleUser === null) {
      const sampleUserInfos = await getUserInfos();
      const sampleUserObject = userRepository.create(sampleUserInfos);
      await userRepository.save(sampleUserObject);
    }

    // always at least 2 cities
    const cityRepository = dataSource.getRepository(City);
    const cities = await cityRepository.find();

    if (cities.length < 1) {
      const allCities = getCities();
      const cityObjects = allCities.map((city) => cityRepository.create(city));
      await cityRepository.save(cityObjects);
    }
    // always some pois
    const poiRepository = dataSource.getRepository(PointOfInterest);
    const pois = await poiRepository.find();

    if (pois.length < 1) {
      const allPois = await getPois();
      const poiObjects = allPois.map((poi) => poiRepository.create(poi));
      await poiRepository.save(poiObjects);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
