/* eslint-disable @typesonflript-eslint/prefer-ts-expect-error */
import { DeepPartial } from "typeorm";
import { PointOfInterest, POIType } from "../../entities/pointOfInterest";

export const pointsOfInterestList: Array<DeepPartial<PointOfInterest>> = [
  {
    name: "Restaurant Le Meurice Alain Ducasse",
    address: "228 Rue de Rivoli",
    postal: "75001",
    type: POIType.RESTAURANT,
    // @ts-ignore
    coordinates: [48.865748, 2.328634],
    creationDate: new Date(),

    websiteURL: "https://www.alainducasse-meurice.com/fr",
    description:
      "Restaurant français haut de gamme situé dans un hôtel de luxe près du Louvre.",
    city: {
      id: 1,
      name: "Paris",
    },
  },
  {
    name: "Five Guys Champs Élysées",
    address: "49-51 Avenue des Champs-Élysées",
    postal: "75008",
    type: POIType.FASTFOOD,
    // @ts-ignore
    coordinates: [48.870221, 2.304592],
    creationDate: new Date(),

    websiteURL: "https://www.fiveguys.fr/",
    description:
      "Chaîne américaine de burgers, frites et hot-dogs, célèbre pour ses milk-shakes sur mesure.",
    city: {
      id: 1,
      name: "Paris",
    },
  },
  {
    name: "Le Syndicat",
    address: "51 Rue du Faubourg Saint-Denis",
    postal: "75010",
    type: POIType.BAR,
    // @ts-ignore
    coordinates: [48.872327, 2.354299],
    creationDate: new Date(),

    websiteURL: "https://www.syndicatcocktailclub.com/",
    description:
      "Bar à cocktails spécialisé dans les spiritueux français, situé dans le quartier du Faubourg Saint-Denis.",
    city: {
      id: 1,
      name: "Paris",
    },
  },
  {
    name: "Restaurant Pierre Gagnaire",
    address: "6 Rue Balzac",
    postal: "75008",
    type: POIType.RESTAURANT,
    // @ts-ignore
    coordinates: [48.872957, 2.301338],
    creationDate: new Date(),

    websiteURL:
      "https://www.pierregagnaire.com/restaurant/pierre-gagnaire-paris",
    description:
      "Restaurant de haute cuisine française, triplement étoilé par le Guide Michelin.",
    city: {
      id: 1,
      name: "Paris",
    },
  },
  {
    name: "Cathédrale Notre-Dame de Paris",
    address: "6 Parvis Notre-Dame - Pl. Jean-Paul II",
    postal: "75004",
    type: POIType.PLACEOFRELIGION,
    // @ts-ignore
    coordinates: [48.852937, 2.35005],
    creationDate: new Date(),

    websiteURL: "http://www.notredamedeparis.fr/",
    description:
      "Emblématique cathédrale gothique connue pour ses gargouilles, son chœur et ses vues panoramiques sur Paris.",
    city: {
      id: 1,
      name: "Paris",
    },
  },
  {
    name: "Hôtel The Peninsula Paris",
    address: "19 Avenue Kléber",
    postal: "75116",
    type: POIType.HOSTEL,
    // @ts-ignore
    coordinates: [48.872853, 2.292634],
    creationDate: new Date(),

    websiteURL:
      "https://www.peninsula.com/fr/paris/5-star-luxury-hotel-16th-arrondissement",
    description:
      "Hôtel de luxe offrant un hébergement somptueux à deux pas de l'Arc de Triomphe.",
    city: {
      id: 1,
      name: "Paris",
    },
  },
  {
    name: "Musée d'Orsay",
    address: "1 Rue de la Légion d'Honneur",
    postal: "75007",
    type: POIType.MUSEUM,
    // @ts-ignore
    coordinates: [48.859961, 2.326561],
    creationDate: new Date(),

    websiteURL: "https://www.musee-orsay.fr/",
    description:
      "Musée d'art et de culture, connu pour sa collection d'œuvres impressionnistes et post-impressionnistes.",
    city: {
      id: 1,
      name: "Paris",
    },
  },
  {
    name: "Restaurant Frenchie",
    address: "5-6 Rue du Nil",
    postal: "75002",
    type: POIType.RESTAURANT,
    // @ts-ignore
    coordinates: [48.86679, 2.349369],
    creationDate: new Date(),

    websiteURL: "https://www.frenchie-restaurant.com/",
    description:
      "Restaurant contemporain proposant une cuisine française inventive dans une atmosphère intime.",
    city: {
      id: 1,
      name: "Paris",
    },
  },
  {
    name: "Sainte-Chapelle",
    address: "8 Boulevard du Palais",
    postal: "75001",
    type: POIType.PLACEOFRELIGION,
    // @ts-ignore
    coordinates: [48.855376, 2.345007],
    creationDate: new Date(),

    websiteURL: "http://www.sainte-chapelle.fr/",
    description:
      "Chapelle gothique rayonnante connue pour ses vitraux colorés et sa relique de la Couronne d'épines.",
    city: {
      id: 1,
      name: "Paris",
    },
  },
  {
    name: "Hôtel Ritz Paris",
    address: "15 Place Vendôme",
    postal: "75001",
    type: POIType.HOSTEL,
    // @ts-ignore
    coordinates: [48.867266, 2.329599],
    creationDate: new Date(),

    websiteURL: "https://www.ritzparis.com/",
    description:
      "Hôtel de luxe emblématique offrant un hébergement raffiné et un service exceptionnel sur la Place Vendome",
    city: {
      id: 1,
      name: "Paris",
    },
  },
  {
    name: "Restaurant Paul Bocuse",
    address: "40 Rue de la Plage",
    postal: "69660",
    type: POIType.RESTAURANT,
    // @ts-ignore
    coordinates: [45.83256, 4.852466],
    creationDate: new Date(),

    websiteURL: "https://www.bocuse.fr/",
    description:
      "Restaurant français légendaire géré par le célèbre chef Paul Bocuse.",
    city: {
      id: 2,
      name: "Lyon",
    },
  },
  {
    name: "Burger King Lyon Part Dieu",
    address: "CC Lyon Part Dieu",
    postal: "69003",
    type: POIType.FASTFOOD,
    // @ts-ignore
    coordinates: [45.760511, 4.86055],
    creationDate: new Date(),

    websiteURL: "https://www.burgerking.fr/",
    description:
      "Chaîne de fast-food populaire connue pour ses burgers flambés sur le gril.",
    city: {
      id: 2,
      name: "Lyon",
    },
  },
  {
    name: "L'Antiquaire",
    address: "20 Rue Hippolyte Flandrin",
    postal: "69001",
    type: POIType.BAR,
    // @ts-ignore
    coordinates: [45.767649, 4.836123],
    creationDate: new Date(),

    description:
      "Bar à cocktails chic et cosy, spécialisé dans les classiques revisités et les créations originales.",
    city: {
      id: 2,
      name: "Lyon",
    },
  },
  {
    name: "Restaurant Le Gourmet de Sèze",
    address: "129 Rue de Sèze",
    postal: "69006",
    type: POIType.RESTAURANT,
    // @ts-ignore
    coordinates: [45.76957, 4.846598],
    creationDate: new Date(),

    websiteURL: "https://www.legourmetdeseze.com/",
    description:
      "Restaurant français servant des plats raffinés dans un décor élégant et contemporain.",
    city: {
      id: 2,
      name: "Lyon",
    },
  },
  {
    name: "Cathédrale Saint-Jean-Baptiste",
    address: "Place Saint-Jean",
    postal: "69005",
    type: POIType.PLACEOFRELIGION,
    // @ts-ignore
    coordinates: [45.762732, 4.827161],
    creationDate: new Date(),

    description:
      "Cathédrale historique, connue pour son horloge astronomique et sa crypte archéologique.",
    city: {
      id: 2,
      name: "Lyon",
    },
  },
  {
    name: "Hôtel Sofitel Lyon Bellecour",
    address: "20 Quai Gailleton",
    postal: "69002",
    type: POIType.HOSTEL,
    // @ts-ignore
    coordinates: [45.752853, 4.827542],
    creationDate: new Date(),

    websiteURL: "https://www.sofitel-lyon-bellecour.com/",
    description:
      "Hôtel de luxe offrant des chambres élégantes, un spa, deux restaurants et un bar panoramique.",
    city: {
      id: 2,
      name: "Lyon",
    },
  },
  {
    name: "Musée des Confluences",
    address: "86 Quai Perrache",
    postal: "69002",
    type: POIType.MUSEUM,
    // @ts-ignore
    coordinates: [45.7333, 4.8176],
    creationDate: new Date(),

    websiteURL: "https://www.museedesconfluences.fr/fr",
    description:
      "Musée de sciences naturelles et de sociétés, situé au confluent du Rhône et de la Saône.",
    city: {
      id: 2,
      name: "Lyon",
    },
  },
  {
    name: "Restaurant Le Sud",
    address: "11 Place Antonin Poncet",
    postal: "69002",
    type: POIType.RESTAURANT,
    // @ts-ignore
    coordinates: [45.757915, 4.834815],
    creationDate: new Date(),

    websiteURL: "https://www.nicolas-de-rabaudy.com/le-sud/",
    description:
      "Restaurant proposant une cuisine méditerranéenne dans une ambiance décontractée et élégante.",
    city: {
      id: 2,
      name: "Lyon",
    },
  },
  {
    name: "Basilique Notre-Dame de Fourvière",
    address: "8 Place de Fourvière",
    postal: "69005",
    type: POIType.PLACEOFRELIGION,
    // @ts-ignore
    coordinates: [45.76242, 4.821302],
    creationDate: new Date(),

    websiteURL: "https://www.fourviere.org/",
    description:
      "Basilique célèbre perchée sur une colline, offrant des vues panoramiques sur la ville de Lyon.",
    city: {
      id: 2,
      name: "Lyon",
    },
  },
  {
    name: "InterContinental Lyon - Hotel Dieu",
    address: "20 Quai Jules Courmont",
    postal: "69002",
    type: POIType.HOSTEL,
    // @ts-ignore
    coordinates: [45.758829, 4.835767],
    creationDate: new Date(),

    websiteURL: "https://lyon.intercontinental.com/",
    description:
      "Hôtel de luxe situé dans un monument historique, offrant un restaurant gastronomique et un spa somptueux.",
    city: {
      id: 2,
      name: "Lyon",
    },
  },
  {
    name: "L'Huitrière",
    address: "3 Rue des Chats Bossus",
    postal: "59800",
    type: POIType.RESTAURANT,
    // @ts-ignore
    coordinates: [50.636299, 3.064128],
    creationDate: new Date(),

    websiteURL: "https://www.huitriere.fr/",
    description:
      "Restaurant de fruits de mer haut de gamme situé dans un décor Art déco raffiné.",
    city: {
      id: 3,
      name: "Lille",
    },
  },
  {
    name: "McDonald's Lille Fives",
    address: "Centre Commercial Lillenium",
    postal: "59160",
    type: POIType.FASTFOOD,
    // @ts-ignore
    coordinates: [50.625007, 3.099771],
    creationDate: new Date(),

    websiteURL: "https://www.mcdonalds.fr/",
    description:
      "Chaîne de restauration rapide proposant des burgers, des frites et des boissons gazeuses.",
    city: {
      id: 3,
      name: "Lille",
    },
  },
  {
    name: "Le Dandy",
    address: "67 Rue Basse",
    postal: "59800",
    type: POIType.BAR,
    // @ts-ignore
    coordinates: [50.639938, 3.059792],
    creationDate: new Date(),

    description:
      "Bar à cocktails élégant et branché, situé dans le Vieux Lille.",
    city: {
      id: 3,
      name: "Lille",
    },
  },
  {
    name: "Restaurant La Petite Cour",
    address: "17 Rue de la Monnaie",
    postal: "59800",
    type: POIType.RESTAURANT,
    // @ts-ignore
    coordinates: [50.638178, 3.062437],
    creationDate: new Date(),

    websiteURL: "https://www.lapetitecourlille.fr/",
    description:
      "Restaurant proposant une cuisine française moderne dans une cour intérieure pittoresque.",
    city: {
      id: 3,
      name: "Lille",
    },
  },
  {
    name: "Cathédrale Notre-Dame-de-la-Treille",
    address: "1 Parvis Notre-Dame-de-la-Treille",
    postal: "59800",
    type: POIType.PLACEOFRELIGION,
    // @ts-ignore
    coordinates: [50.638262, 3.0653],
    creationDate: new Date(),

    description:
      "Cathédrale moderne avec une façade en marbre translucide, située dans le Vieux Lille.",
    city: {
      id: 3,
      name: "Lille",
    },
  },
  {
    name: "Hôtel Carlton",
    address: "3 Rue Pierre Mauroy",
    postal: "59800",
    type: POIType.HOSTEL,
    // @ts-ignore
    coordinates: [50.635513, 3.063426],
    creationDate: new Date(),

    websiteURL: "https://www.carltonlille.com/",
    description:
      "Hôtel de luxe situé en plein cœur de Lille, offrant des chambres élégantes et un bar anglais traditionnel.",
    city: {
      id: 3,
      name: "Lille",
    },
  },
  {
    name: "Musée d'Histoire Naturelle de Lille",
    address: "19 Rue de Bruxelles",
    postal: "59800",
    type: POIType.MUSEUM,
    // @ts-ignore
    coordinates: [50.628181, 3.058638],
    creationDate: new Date(),

    websiteURL: "https://www.lille.fr/Musee-d-Histoire-naturelle",
    description:
      "Musée exposant des collections d'histoire naturelle, de géologie et d'ethnologie.",
    city: {
      id: 3,
      name: "Lille",
    },
  },
  {
    name: "Restaurant Estaminet Gantois",
    address: "32 Rue de Paris",
    postal: "59800",
    type: POIType.RESTAURANT,
    // @ts-ignore
    coordinates: [50.638742, 3.062732],
    creationDate: new Date(),

    websiteURL: "https://www.estaminetdugantois.com/",
    description:
      "Restaurant traditionnel servant des plats régionaux dans une atmosphère chaleureuse et conviviale.",
    city: {
      id: 3,
      name: "Lille",
    },
  },
  {
    name: "Eglise Saint-Maurice",
    address: "Parvis Saint-Maurice",
    postal: "59800",
    type: POIType.PLACEOFRELIGION,
    // @ts-ignore
    coordinates: [50.634403, 3.063708],
    creationDate: new Date(),

    description:
      "Église gothique du 14ème siècle avec de magnifiques vitraux, située en plein cœur de Lille.",
    city: {
      id: 3,
      name: "Lille",
    },
  },
  {
    name: "Hôtel Barrière Lille",
    address: "777bis Pont de Flandres",
    postal: "59777",
    type: POIType.HOSTEL,
    // @ts-ignore
    coordinates: [50.636591, 3.070481],
    creationDate: new Date(),

    websiteURL: "https://www.hotelsbarriere.com/fr/lille/l-hotel-barriere.html",
    description:
      "Hôtel contemporain offrant un casino, un théâtre, deux restaurants et un bar.",
    city: {
      id: 3,
      name: "Lille",
    },
  },
  {
    name: "Le Petit Nice",
    address: "Anse de Maldormé",
    postal: "13007",
    type: POIType.RESTAURANT,
    // @ts-ignore
    coordinates: [43.275052, 5.347437],
    creationDate: new Date(),

    websiteURL: "https://www.passedat.fr/",
    description:
      "Restaurant trois étoiles Michelin avec vue sur la mer, spécialisé dans les fruits de mer.",
    city: {
      id: 4,
      name: "Marseille",
    },
  },
  {
    name: "Quick Marseille",
    address: "Centre Bourse",
    postal: "13001",
    type: POIType.FASTFOOD,
    // @ts-ignore
    coordinates: [43.295399, 5.377132],
    creationDate: new Date(),

    websiteURL: "https://www.quick.fr/",
    description:
      "Chaîne de restauration rapide proposant des burgers, des frites et des boissons gazeuses.",
    city: {
      id: 4,
      name: "Marseille",
    },
  },
  {
    name: "Carry Nation",
    address: "Secret Location",
    postal: "13006",
    type: POIType.BAR,
    // @ts-ignore
    coordinates: [43.291697, 5.380679],
    creationDate: new Date(),

    websiteURL: "https://www.carrynation.fr/",
    description:
      "Bar à cocktails clandestin inspiré de l'époque de la Prohibition.",
    city: {
      id: 4,
      name: "Marseille",
    },
  },
  {
    name: "Chez Fonfon",
    address: "140 Rue du Vallon des Auffes",
    postal: "13007",
    type: POIType.RESTAURANT,
    // @ts-ignore
    coordinates: [43.279016, 5.347595],
    creationDate: new Date(),

    websiteURL: "https://www.chez-fonfon.com/",
    description:
      "Restaurant proposant une cuisine méditerranéenne avec vue sur le Vallon des Auffes.",
    city: {
      id: 4,
      name: "Marseille",
    },
  },
  {
    name: "Basilique Notre-Dame de la Garde",
    address: "Rue Fort du Sanctuaire",
    postal: "13006",
    type: POIType.PLACEOFRELIGION,
    // @ts-ignore
    coordinates: [43.284804, 5.371192],
    creationDate: new Date(),

    websiteURL: "https://www.notredamedelagarde.com/",
    description:
      "Basilique célèbre perchée sur une colline, offrant des vues panoramiques sur Marseille.",
    city: {
      id: 4,
      name: "Marseille",
    },
  },
  {
    name: "InterContinental Marseille - Hotel Dieu",
    address: "1 Place Daviel",
    postal: "13002",
    type: POIType.HOSTEL,
    // @ts-ignore
    coordinates: [43.298957, 5.375296],
    creationDate: new Date(),

    websiteURL: "https://marseille.intercontinental.com/",
    description:
      "Hôtel de luxe situé dans un monument historique, offrant un restaurant gastronomique et un spa somptueux.",
    city: {
      id: 4,
      name: "Marseille",
    },
  },
  {
    name: "Musée d'Histoire de Marseille",
    address: "2 Rue Henri Barbusse",
    postal: "13001",
    type: POIType.MUSEUM,
    // @ts-ignore
    coordinates: [43.296618, 5.376496],
    creationDate: new Date(),

    websiteURL: "https://www.musee-histoire-marseille-voie-historique.fr/",
    description:
      "Musée présentant l'histoire de la ville de Marseille depuis sa fondation jusqu'à aujourd'hui.",
    city: {
      id: 4,
      name: "Marseille",
    },
  },
  {
    name: "Le Miramar",
    address: "12 Quai du Port",
    postal: "13002",
    type: POIType.RESTAURANT,
    // @ts-ignore
    coordinates: [43.295703, 5.374571],
    creationDate: new Date(),

    websiteURL: "https://www.lemiramar.fr/",
    description:
      "Restaurant spécialisé dans la bouillabaisse et autres spécialités provençales.",
    city: {
      id: 4,
      name: "Marseille",
    },
  },
  {
    name: "Cathédrale de la Major",
    address: "Place de la Major",
    postal: "13002",
    type: POIType.PLACEOFRELIGION,
    // @ts-ignore
    coordinates: [43.297909, 5.365127],
    creationDate: new Date(),

    description:
      "Cathédrale monumentale en style néo-byzantin offrant une vue imprenable sur le port de Marseille.",
    city: {
      id: 4,
      name: "Marseille",
    },
  },
  {
    name: "Hotel C2",
    address: "48 Rue Roux de Brignoles",
    postal: "13006",
    type: POIType.HOSTEL,
    // @ts-ignore
    coordinates: [43.290374, 5.376608],
    creationDate: new Date(),

    websiteURL: "https://www.c2-hotel.com/",
    description:
      "Hôtel de luxe dans un palais du 19ème siècle offrant un spa, un bar et une plage privée.",
    city: {
      id: 4,
      name: "Marseille",
    },
  },
  {
    name: "Le Pavillon des Boulevards",
    address: "120 Rue Croix de Seguey",
    postal: "33000",
    type: POIType.RESTAURANT,
    // @ts-ignore
    coordinates: [44.847777, -0.578431],
    creationDate: new Date(),

    websiteURL: "https://www.pavillon-des-boulevards.com/",
    description:
      "Restaurant étoilé au Guide Michelin proposant une cuisine française raffinée.",
    city: {
      id: 5,
      name: "Bordeaux",
    },
  },
  {
    name: "McDonald's Bordeaux Meriadeck",
    address: "7 Rue du Château d'Eau",
    postal: "33000",
    type: POIType.FASTFOOD,
    // @ts-ignore
    coordinates: [44.842434, -0.579806],
    creationDate: new Date(),

    websiteURL: "https://www.mcdonalds.fr/",
    description:
      "Chaîne de restauration rapide proposant des burgers, des frites et des boissons gazeuses.",
    city: {
      id: 5,
      name: "Bordeaux",
    },
  },
  {
    name: "Le Point Rouge",
    address: "1 Quai de Bacalan",
    postal: "33300",
    type: POIType.BAR,
    // @ts-ignore
    coordinates: [44.860292, -0.548582],
    creationDate: new Date(),

    websiteURL: "https://www.lepointrouge.com/",
    description:
      "Bar à cocktails raffiné proposant une vaste sélection de whiskies et de champagnes.",
    city: {
      id: 5,
      name: "Bordeaux",
    },
  },
  {
    name: "Restaurant Garopapilles",
    address: "62 Rue Abbé de l'Épée",
    postal: "33000",
    type: POIType.RESTAURANT,
    // @ts-ignore
    coordinates: [44.84039, -0.583715],
    creationDate: new Date(),

    websiteURL: "https://www.garopapilles.com/",
    description:
      "Restaurant étoilé au Guide Michelin offrant une cuisine inventive dans un cadre contemporain.",
    city: {
      id: 5,
      name: "Bordeaux",
    },
  },
  {
    name: "Cathédrale Saint-André",
    address: "Place Pey-Berland",
    postal: "33000",
    type: POIType.PLACEOFRELIGION,
    // @ts-ignore
    coordinates: [44.837911, -0.577896],
    creationDate: new Date(),

    description:
      "Cathédrale gothique imposante, l'une des plus anciennes de la ville.",
    city: {
      id: 5,
      name: "Bordeaux",
    },
  },
  {
    name: "InterContinental Bordeaux Le Grand Hotel",
    address: "2-5 Place de la Comédie",
    postal: "33000",
    type: POIType.HOSTEL,
    // @ts-ignore
    coordinates: [44.84262, -0.573584],
    creationDate: new Date(),

    websiteURL: "https://bordeaux.intercontinental.com/",
    description:
      "Hôtel de luxe situé sur la place de la Comédie, offrant un spa, deux restaurants et un bar sur le toit.",
    city: {
      id: 5,
      name: "Bordeaux",
    },
  },
  {
    name: "Musée d'Aquitaine",
    address: "20 Cours Pasteur",
    postal: "33000",
    type: POIType.MUSEUM,
    // @ts-ignore
    coordinates: [44.837722, -0.574838],
    creationDate: new Date(),

    websiteURL: "http://www.musee-aquitaine-bordeaux.fr/",
    description:
      "Musée retraçant l'histoire de Bordeaux et de la région Aquitaine, depuis la préhistoire jusqu'à nos jours.",
    city: {
      id: 5,
      name: "Bordeaux",
    },
  },
  {
    name: "Le Chapon Fin",
    address: "5 Rue Montesquieu",
    postal: "33000",
    type: POIType.RESTAURANT,
    // @ts-ignore
    coordinates: [44.841545, -0.576979],
    creationDate: new Date(),

    websiteURL: "https://www.chapon-fin.com/",
    description:
      "Restaurant historique proposant une cuisine française innovante dans un cadre élégant.",
    city: {
      id: 5,
      name: "Bordeaux",
    },
  },
  {
    name: "Basilique Saint-Michel",
    address: "Place Meynard",
    postal: "33000",
    type: POIType.PLACEOFRELIGION,
    // @ts-ignore
    coordinates: [44.836324, -0.568161],
    creationDate: new Date(),

    description:
      "Basilique gothique du 16ème siècle, connue pour son clocher séparé et sa crypte archéologique.",
    city: {
      id: 5,
      name: "Bordeaux",
    },
  },
  {
    name: "Yndo Hôtel",
    address: "108 Rue Abbé de l'Épée",
    postal: "33000",
    type: POIType.HOSTEL,
    // @ts-ignore
    coordinates: [44.841382, -0.584763],
    creationDate: new Date(),

    websiteURL: "https://www.yndohotel.fr/",
    description:
      "Hôtel de luxe dans une maison de ville du 19ème siècle, avec un restaurant gastronomique.",
    city: {
      id: 5,
      name: "Bordeaux",
    },
  },
  {
    name: "Restaurant Michel Sarran",
    address: "21 Boulevard Armand Duportal",
    postal: "31000",
    type: POIType.RESTAURANT,
    // @ts-ignore
    coordinates: [43.609169, 1.443137],
    creationDate: new Date(),

    websiteURL: "http://www.michel-sarran.com/",
    description:
      "Restaurant étoilé au Guide Michelin, célèbre pour sa cuisine innovante.",
    city: {
      id: 6,
      name: "Toulouse",
    },
  },
  {
    name: "McDonald's Toulouse Capitole",
    address: "1 Rue Lafayette",
    postal: "31000",
    type: POIType.FASTFOOD,
    // @ts-ignore
    coordinates: [43.604645, 1.444205],
    creationDate: new Date(),

    websiteURL: "https://www.mcdonalds.fr/",
    description:
      "Chaîne de restauration rapide proposant des burgers, des frites et des boissons gazeuses.",
    city: {
      id: 6,
      name: "Toulouse",
    },
  },
  {
    name: "Fat Cat",
    address: "4 Rue Castellane",
    postal: "31000",
    type: POIType.BAR,
    // @ts-ignore
    coordinates: [43.605614, 1.442285],
    creationDate: new Date(),

    description:
      "Bar à cocktails et whiskies avec une ambiance cosy et chaleureuse.",
    city: {
      id: 6,
      name: "Toulouse",
    },
  },
  {
    name: "Restaurant En Marge",
    address: "1204 Route de Lapeyrouse-Fossat",
    postal: "31320",
    type: POIType.RESTAURANT,
    // @ts-ignore
    coordinates: [43.502219, 1.434081],
    creationDate: new Date(),

    websiteURL: "https://www.restaurantenmarge.com/",
    description:
      "Restaurant gastronomique situé dans une ferme rénovée, offrant une cuisine de saison.",
    city: {
      id: 6,
      name: "Toulouse",
    },
  },
  {
    name: "Basilique Saint-Sernin",
    address: "Place Saint-Sernin",
    postal: "31000",
    type: POIType.PLACEOFRELIGION,
    // @ts-ignore
    coordinates: [43.610753, 1.44257],
    creationDate: new Date(),

    description:
      "Basilique romane du XIe siècle, l'une des plus grandes d'Europe.",
    city: {
      id: 6,
      name: "Toulouse",
    },
  },
  {
    name: "Pullman Toulouse Centre Ramblas",
    address: "84 Allées Jean Jaurès",
    postal: "31000",
    type: POIType.HOSTEL,
    // @ts-ignore
    coordinates: [43.607588, 1.449398],
    creationDate: new Date(),

    websiteURL: "https://all.accor.com/hotel/1168/index.fr.shtml",
    description:
      "Hôtel de luxe offrant des chambres modernes, un restaurant, un bar et une salle de sport.",
    city: {
      id: 6,
      name: "Toulouse",
    },
  },
  {
    name: "Musée des Augustins",
    address: "21 Rue de Metz",
    postal: "31000",
    type: POIType.MUSEUM,
    // @ts-ignore
    coordinates: [43.601787, 1.44496],
    creationDate: new Date(),

    websiteURL: "https://www.augustins.org/",
    description:
      "Musée des beaux-arts situé dans un ancien couvent, avec une collection variée allant de l'art roman au XXe siècle.",
    city: {
      id: 6,
      name: "Toulouse",
    },
  },
  {
    name: "La Pente Douce",
    address: "11 Rue des Trois Banquets",
    postal: "31000",
    type: POIType.RESTAURANT,
    // @ts-ignore
    coordinates: [43.59988, 1.434905],
    creationDate: new Date(),

    websiteURL: "https://www.lapentedouce.fr/",
    description:
      "Restaurant à l'atmosphère décontractée, connu pour sa cuisine créative et de saison.",
    city: {
      id: 6,
      name: "Toulouse",
    },
  },
  {
    name: "Église Notre-Dame de La Dalbade",
    address: "Place de La Dalbade",
    postal: "31000",
    type: POIType.PLACEOFRELIGION,
    // @ts-ignore
    coordinates: [43.602336, 1.437946],
    creationDate: new Date(),

    description:
      "Église gothique dotée d'un clocher renommé pour ses carillons et d'un portail richement sculpté.",
    city: {
      id: 6,
      name: "Toulouse",
    },
  },
  {
    name: "La Cour des Consuls Hotel & Spa Toulouse - MGallery",
    address: "46 Rue des Couteliers",
    postal: "31000",
    type: POIType.HOSTEL,
    // @ts-ignore
    coordinates: [43.60416, 1.439373],
    creationDate: new Date(),

    websiteURL: "https://all.accor.com/hotel/8753/index.fr.shtml",
    description:
      "Hôtel 5 étoiles situé dans deux hôtels particuliers du XVIIIe siècle, offrant un spa et un restaurant gastronomique.",
    city: {
      id: 6,
      name: "Toulouse",
    },
  },
];
