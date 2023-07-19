const productsListMock = [
  {
    id: 1,
    name: "Saxofón Alto Yamaha Profesional",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    category: "Instrumentos de viento",
    brand: "Yamaha",
    price: "$4.500.000",
    stock: 23,
    image:
      "https://cdn.shopify.com/s/files/1/2235/9983/products/AS650.jpg?v=1581698765",
  },
  {
    id: 2,
    name: "GUITARRA ELEC IBANEZ AS53-TF",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    category: "Guitarras y Bajos",
    brand: "Ibanez",
    price: "$1.670.000",
    stock: 18,
    image:
      "https://cdn.shopify.com/s/files/1/0512/9116/0767/products/p_region_AS53_TF_5B_05.png?v=1657644013&width=700",
  },
  {
    id: 3,
    name: "TROMPETA PARA ESTUDIANTE BACH TR500DIR",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    category: "Instrumemtos de viento",
    brand: "Bach",
    price: "$3.850.000",
    stock: 20,
    image:
      "https://cdn.shopify.com/s/files/1/2235/9983/products/VT4001-01_1100x.png?v=1559162975",
  },
  {
    id: 4,
    name: "TROMPETA BACH TR655DIR",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    category: "Instrumentos de viento",
    brand: "Bach",
    price: "$2.210.000",
    stock: 218,
    image:
      "https://cdn.shopify.com/s/files/1/2235/9983/products/TR655-650x650_1100x.jpg?v=1676472454",
  },
  {
    id: 5,
    name: "BAJO ELECTRICO FENDER SQUIRE- Classic Vibe 70 JAZZ BASS -NATURAL",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    category: "Guitarras y Bajos",
    brand: "Fender",
    price: "$2.300.000",
    stock: 23,
    image:
      "https://cdn.shopify.com/s/files/1/2235/9983/products/530c8dd7-3531-4e6c-96f8-2e80508b1085_1100x.jpg?v=1584731253",
  },
  {
    id: 6,
    name: "BATERIA LUDWIG EVOLUTION OUTFIT 22 CON HARD & ZBT PACK NEGRA",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    category: "Baterias",
    brand: "Ludwing",
    price: "$5.950.000",
    stock: 23,
    image:
      "https://cdn.shopify.com/s/files/1/2235/9983/products/Captura_de_pantalla_2019-02-18_a_las_10.26.58_a.m._1100x.png?v=1678308427",
  },
  {
    id: 7,
    name: "VIOLIN 4/4 SOLIDO VERONA HXTQ09FR NATURAL",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    category: "Instrumentos de viento",
    brand: "Verona",
    price: "$650.000",
    stock: 28,
    image:
      "https://cdn.shopify.com/s/files/1/2235/9983/products/cv3727_1100x.jpg?v=1663178236",
  },
  {
    id: 8,
    name: "CLARINETE SIb SELMER 1400B",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    category: "Instrumentos de viento",
    brand: "Selmer",
    price: "$5.000.000",
    stock: 23,
    image:
      "https://cdn.shopify.com/s/files/1/2235/9983/products/1Captura_de_pantalla_2019-10-09_a_las_3.19.40_p.m._600x.png?v=1570652452",
  },
  {
    id: 9,
    name: "GUITARRA ACUSTICA MARTIN 11LX1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    category: "Guitarras",
    brand: "Martin",
    price: "$3.100.000",
    stock: 33,
    image:
      "https://cdn.shopify.com/s/files/1/2235/9983/products/LX1-Little-Martin-11LX1_1100x.jpg?v=1662395594",
  },
  {
    id: 10,
    name: "SAXOFON TENOR CONN tS651DIR",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    category: "Instrumentos de viento",
    brand: "Conn",
    price: "$9.950.000",
    stock: 28,
    image:
      "https://cdn.shopify.com/s/files/1/2235/9983/products/VG4942_-_SAXOFON_TENOR_TS651_-_FRONTAL_copia_1100x.jpg?v=1501976099",
  },
];

const productDetailMock = {
  id: 1,
  name: "GUITARRA ELEC IBANEZ AS53-TF",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  category: "Guitarras y Bajos",
  brand: "Ibanez",
  price: "$1.670.000",
  stock: 28,
  images: [
    {
      id: 1,
      url: "https://cdn.shopify.com/s/files/1/0512/9116/0767/products/p_region_AS53_TF_5B_05.png?v=1657644013&width=700",
    },
    {
      id: 2,
      url: "https://cdn.shopify.com/s/files/1/0512/9116/0767/products/p_region_AS53_TF_5B_05_sub_1.jpg?v=1657644013&width=700",
    },
    {
      id: 3,
      url: "https://cdn.shopify.com/s/files/1/0512/9116/0767/products/p_region_AS53_TF_5B_05_sub_4.jpg?v=1657644013&width=700",
    },
    {
      id: 4,
      url: "https://cdn.shopify.com/s/files/1/0512/9116/0767/products/p_region_AS53_TF_5B_05_sub_3.jpg?v=1657644013&width=700",
    },
    {
      id: 5,
      url: "https://cdn.shopify.com/s/files/1/0512/9116/0767/products/p_region_AS53_TF_5B_05_sub_2.jpg?v=1657644013&width=700",
    },
  ],
  image:
    "https://cdn.shopify.com/s/files/1/2235/9983/products/AS650.jpg?v=1581698765",
};

const categoriesMock = [
  {
    id: 1,
    urlLabel: "guitarras-y-bajos",
    image:
      "https://www.tiendacompensar.com/ccstore/v1/images/?source=/file/v2106446387901685731/products/id1413.manos-de-hombre-tocan-guitarra-acustica.jpg&height=350&width=350",
    name: "Guitarras y Bajos",
    stock: 30,
  },
  {
    id: 2,
    urlLabel: "instrumentos-de-viento",
    image:
      "https://eldiariony.com/wp-content/uploads/sites/2/2022/06/saxofon-campan%CC%83a-gofundme-shutterstock_600775652.jpg?quality=75&strip=all&w=1200",
    name: "Instrumentos de viento",
    stock: 20,
  },
  {
    id: 3,
    urlLabel: "percusion",
    image:
      "https://buscaunmusico.com/wp-content/uploads/2020/01/drums-2599508_640.jpg",
    name: "Percusión",
    stock: 5,
  },
  {
    id: 4,
    urlLabel: "pianos",
    image:
      "https://t2.uc.ltmcdn.com/es/posts/9/8/2/cuales_son_los_mejores_pianistas_del_mundo_17289_orig.jpg",
    name: "Pianos",
    stock: 10,
  },
  {
    id: 5,
    urlLabel: "sintetizadores",
    image:
      "https://djpmusicschool.com/wp-content/uploads/sintetizador-djp-music-school.png",
    name: "Sintetizadores",
    stock: 8,
  },
  {
    id: 6,
    urlLabel: "teclados-electronicos",
    image:
      "https://belmusic.com.co/wp-content/uploads/2018/09/Teclados-Belmusic-2.jpg",
    name: "Teclados electrónicos",
    stock: 10,
  },
];

const categoriesDropdownMock = [
  {
    id: 1,
    image: "",
    label: "Guitarras y Bajos",
    value: "1",
  },
  {
    id: 2,
    image: "",
    label: "Instrumentos de viento",
    value: "2",
  },
  {
    id: 3,
    image: "",
    label: "Percusión",
    value: "3",
  },
  {
    id: 4,
    image: "",
    label: "Pianos",
    value: "4",
  },
  {
    id: 5,
    image: "",
    label: "Sintetizadores",
    value: "5",
  },
  {
    id: 6,
    image: "",
    label: "Teclados electrónicos",
    value: "6",
  },
];

const brandsDropdownMock = [
  {
    id: 1,
    image: "",
    label: "Gibson",
    value: "1",
  },
  {
    id: 2,
    image: "",
    label: "Yamaha",
    value: "2",
  },
  {
    id: 3,
    image: "",
    label: "Ibanez",
    value: "3",
  },
  {
    id: 4,
    image: "",
    label: "Marshall",
    value: "4",
  },
  {
    id: 5,
    image: "",
    label: "Line 6",
    value: "5",
  },
  {
    id: 6,
    image: "",
    label: "Roland",
    value: "6",
  },
];

const breadCrumbMock = [
  {
    id: 1,
    text: 'Home',
    title: 'Ir a Home',
    href: '/home'
  },
  {
    id: 2,
    text: 'Guitarras y Bajos',
    title: 'Ir a Guitarras y Bajos',
    href: '/home'
  },
  {
    id: 3,
    text: 'GUITARRA ELEC IBANEZ AS53-TF',
    title: '',
    href: ''
  },
];

export {
  productsListMock,
  productDetailMock,
  categoriesMock,
  categoriesDropdownMock,
  brandsDropdownMock,
  breadCrumbMock
};
