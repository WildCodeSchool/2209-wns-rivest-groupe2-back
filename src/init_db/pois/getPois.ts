/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { DeepPartial } from "typeorm";
import { POIType, PointOfInterest } from "../../entities/pointOfInterest";
import { Point } from "geojson";
/* import dataSource from "../../utils/datasource";
import { OpeningHours } from "../../entities/openingHours"; */

const getPois = async (): Promise<Array<DeepPartial<PointOfInterest>>> => {
  // @ts-ignore
  const papillesCoordinates: Point = [48.84461, 2.34174];
  // @ts-ignore
  const boeufCoordinates: Point = [45.7622, 4.82645];
  /* const openingHoursRepository = dataSource.getRepository(OpeningHours);
  const savedOpeningHoursPapilles = [
    {
      value: "monday",
      name: "Lundi",
      hoursOpen: ["Fermé"],
      hoursClose: [],
    },
    {
      value: "tuesday",
      name: "Mardi",
      hoursOpen: ["12:00"],
      hoursClose: ["14:00"],
    },
    {
      value: "wednesday",
      name: "Mercredi",
      hoursOpen: ["12:00"],
      hoursClose: ["14:00"],
    },
    {
      value: "thursday",
      name: "Jeudi",
      hoursOpen: ["12:00"],
      hoursClose: ["14:00"],
    },
    {
      value: "friday",
      name: "Vendredi",
      hoursOpen: ["12:00"],
      hoursClose: ["14:00"],
    },
    {
      value: "saturday",
      name: "Samedi",
      hoursOpen: ["12:00"],
      hoursClose: ["14:00"],
    },
    {
      value: "sunday",
      name: "Dimanche",
      hoursOpen: ["Fermé"],
      hoursClose: [],
    },
  ];
  const openingHoursObjectPapilles = savedOpeningHoursPapilles.map((hour) =>
    openingHoursRepository.create(hour)
  );
  const openingHoursPapilles = await openingHoursRepository.save(
    openingHoursObjectPapilles
  );
  const savedOpeningHoursBoeuf = [
    {
      value: "monday",
      name: "Lundi",
      hoursOpen: "Fermé",
      hoursClose: "",
    },
    {
      value: "tuesday",
      name: "Mardi",
      hoursOpen: "19:00",
      hoursClose: "21:30",
    },
    {
      value: "wednesday",
      name: "Mercredi",
      hoursOpen: "19:00",
      hoursClose: "21:30",
    },
    {
      value: "thursday",
      name: "Jeudi",
      hoursOpen: "19:00",
      hoursClose: "21:30",
    },
    {
      value: "friday",
      name: "Vendredi",
      hoursOpen: "19:00",
      hoursClose: "21:30",
    },
    {
      value: "saturday",
      name: "Samedi",
      hoursOpen: "19:00",
      hoursClose: "21:30",
    },
    {
      value: "sunday",
      name: "Dimanche",
      hoursOpen: "19:00",
      hoursClose: "21:30",
    },
  ];
  const openingHoursObjectBoeuf = savedOpeningHoursBoeuf.map((hour) =>
    openingHoursRepository.create(hour)
  );
  const openingHoursBoeuf = await openingHoursRepository.save(
    openingHoursObjectBoeuf
  ); */
  return [
    {
      name: "Les Papilles",
      address: "30 Rue Gay-Lussac",
      postal: "75005",
      city: {
        id: 1,
        name: "Paris",
      },
      creationDate: new Date(),
      type: POIType.RESTAURANT,
      coordinates: papillesCoordinates,
      websiteURL:
        "https://www.thefork.fr/restaurant/les-papilles-r661513?cc=18174-54f",
      description:
        "Restaurant chaleureux aux murs en lambris, proposant une cuisine sophistiquée, des vins du terroir et des produits d'épicerie.",
    },
    {
      name: "Le Bœuf d'Argent",
      address: "29 Rue du Bœuf",
      postal: "69005",
      city: {
        id: 2,
        name: "Lyon",
      },
      creationDate: new Date(),
      type: POIType.RESTAURANT,
      coordinates: boeufCoordinates,
      websiteURL: "https://restaurant-le-boeuf-d-argent.com/fr",
      description:
        "Plats français raffinés à la présentation soignée servis dans un charmant restaurant voûté à l'atmosphère décontractée.",
    },
  ];
};

export default getPois;
