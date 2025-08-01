// src/seed.ts
// Script para poblar la base de datos SQLite con 40 productos de tecnología de ejemplo en TypeScript

import { initDB, db } from "./db";

interface SampleProduct {
  name: string;
  description: string;
}

const sampleProducts: SampleProduct[] = [
  {
    name: "Apple MacBook Pro 14-inch",
    description: "Laptop Apple con chip M1 Pro de alto rendimiento",
  },
  { name: "Dell XPS 13", description: "Ultrabook Dell compacto y potente" },
  { name: "HP Envy 15", description: "Portátil HP con gráficos dedicados" },
  {
    name: "Lenovo ThinkPad X1 Carbon",
    description: "Ultrabook profesional ligero",
  },
  {
    name: "Asus ROG Strix G15",
    description: "Gaming laptop con GPU de alta gama",
  },
  {
    name: "Acer Predator Helios 300",
    description: "Portátil gaming con refrigeración mejorada",
  },
  {
    name: "Microsoft Surface Pro 8",
    description: "2 en 1 con stylus y pantalla táctil",
  },
  {
    name: "Samsung Galaxy S21",
    description: "Smartphone Android con cámara triple",
  },
  {
    name: "Apple iPhone 13",
    description: "Smartphone iOS con chipset A15 Bionic",
  },
  { name: "Google Pixel 6", description: "Smartphone Google con Android puro" },
  { name: "OnePlus 9 Pro", description: "Smartphone con carga ultrarrápida" },
  { name: "Xiaomi Mi 11", description: "Smartphone con pantalla AMOLED" },
  {
    name: "Sony WH-1000XM4",
    description: "Auriculares inalámbricos con cancelación de ruido",
  },
  {
    name: "Bose QuietComfort 35 II",
    description: "Auriculares cómodos con sonido claro",
  },
  {
    name: "JBL Charge 5",
    description: "Altavoz Bluetooth portátil resistente al agua",
  },
  {
    name: "Sony PlayStation 5",
    description: "Consola de videojuegos de última generación",
  },
  {
    name: "Microsoft Xbox Series X",
    description: "Consola de videojuegos con potencia 4K",
  },
  {
    name: "Nintendo Switch OLED",
    description: "Consola híbrida con pantalla OLED",
  },
  {
    name: "Samsung Galaxy Tab S7",
    description: "Tablet Android con S Pen incluido",
  },
  {
    name: "Apple iPad Pro 11-inch",
    description: "Tablet iOS con M1 y pantalla Liquid Retina",
  },
  { name: "Canon EOS R5", description: "Cámara mirrorless profesional 45MP" },
  { name: "Nikon Z6 II", description: "Cámara mirrorless versátil y compacta" },
  {
    name: "GoPro HERO9 Black",
    description: "Cámara de acción 5K resistente al agua",
  },
  { name: "DJI Mavic Air 2", description: "Dron plegable con cámara 4K" },
  { name: "Fitbit Versa 3", description: "Smartwatch con GPS integrado" },
  {
    name: "Apple Watch Series 7",
    description: "Smartwatch con pantalla siempre activa",
  },
  {
    name: "Samsung Galaxy Watch 4",
    description: "Smartwatch con Wear OS de Samsung",
  },
  { name: "Logitech MX Master 3", description: "Ratón inalámbrico ergonómico" },
  {
    name: "Razer DeathAdder V2",
    description: "Ratón gaming con sensor de alta precisión",
  },
  {
    name: "Corsair K95 RGB Platinum",
    description: "Teclado mecánico con retroiluminación RGB",
  },
  {
    name: "SteelSeries Arctis 7",
    description: "Auriculares inalámbricos para gaming",
  },
  {
    name: "Amazon Echo Dot (4th Gen)",
    description: "Altavoz inteligente con Alexa",
  },
  {
    name: "Google Nest Mini",
    description: "Altavoz inteligente con Google Assistant",
  },
  {
    name: "Philips Hue Bulb",
    description: "Bombilla LED inteligente controlable por app",
  },
  {
    name: "TP-Link Archer AX6000",
    description: "Router WiFi 6 de alto rendimiento",
  },
  {
    name: "Netgear Nighthawk R7000",
    description: "Router inalámbrico potente y estable",
  },
  {
    name: "Synology DiskStation DS220+",
    description: "Servidor NAS para almacenamiento en red",
  },
  {
    name: "Seagate Portable 2TB HDD",
    description: "Disco duro externo USB 3.0",
  },
  {
    name: "Samsung T7 1TB SSD",
    description: "Unidad de estado sólido portátil USB-C",
  },
  {
    name: "Kingston DataTraveler 64GB",
    description: "Unidad flash USB 3.0 compacta",
  },
];

async function seed(): Promise<void> {
  try {
    // Inicializa la base de datos (crea tabla si no existe)
    await initDB();

    for (const product of sampleProducts) {
      const price = parseFloat((Math.random() * 1000 + 50).toFixed(2));
      const quantity = Math.floor(Math.random() * 100) + 1;
      const stock = Math.floor(Math.random() * 50);

      await db.run(
        `INSERT INTO products (name, description, price, quantity, stock)
         VALUES (?, ?, ?, ?, ?)`,
        product.name,
        product.description,
        price,
        quantity,
        stock
      );
    }

    console.log(
      `Se han insertado ${sampleProducts.length} productos de tecnología de ejemplo.`
    );
  } catch (err) {
    console.error("Error al poblar la base de datos:", err);
  }
}

seed();
