import { useState, useEffect } from "react";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";


// Pollería nuevos
import imgAlitas from "../assets/products/alitasPollo.png";
import imgMedioPollo from "../assets/products/medioPollo.png";
import imgMilaPollo from "../assets/products/milaPollo.png";
import imgPataMusloNew from "../assets/products/pataMuslo.png";
import imgPataPollo from "../assets/products/pataPollo.png";
import imgPechugas from "../assets/products/pechugasdePollo.png";
import imgPolloEnteroNew from "../assets/products/polloEntero.png";

// Lácteos
import imgYogurTregar from "../assets/products/yogurTregarLitro.png";
import imgLecheSachet from "../assets/products/lecheSachet1L.png";
import imgManteca from "../assets/products/mantecaSerenisima200.png";

// Fiambres
import imgJamonCocido from "../assets/products/jamonCocido.png";
import imgSalame from "../assets/products/salameLaPiamontesa.png";

// Congelados
import imgMedallonesPaty from "../assets/products/medallonesPaty.png";
import imgMedallonVegetariano from "../assets/products/medallonVegetariano.png";

// Limpieza
import imgDetergenteGigante from "../assets/products/detergenteGigante.png";
import imgLavandinaGel from "../assets/products/lavandinaGel.png";
import imgLavandinaLiquida from "../assets/products/lavandinaLiquida.png";
import imgLiquidoLavarropas from "../assets/products/liquidoLavarropas.png";
import imgOffAerosol from "../assets/products/offAerosol.png";
import imgDetergenteCif from "../assets/products/detergenteCif500.png";

// New
import imgAceiteCocinero from "../assets/products/aceiteCocinero900.png";
import imgAcetoBalsamico from "../assets/products/acetoBalsámicoCasalta250.png";
import imgArrozMandisovi from "../assets/products/arrozMandisoviLg1000.png";
import imgAtunCampagnola from "../assets/products/atúnNaturalLaCampagnola170.png";
import imgCafeDolca from "../assets/products/cafeInstantaneoDolca170.png";
import imgCaramelos from "../assets/products/caramelosMediaHora200.png";
import imgChocolateBlock from "../assets/products/chocolateManíCoflerBlock170.png";
import imgCoposGranix from "../assets/products/coposDeMaizGranix400.png";
import imgDuraznos from "../assets/products/duraznosAlmíbarArcor820.png";
import imgEdulcorante from "../assets/products/EdulcoranteLíquidoSweetHileret200.png";
import imgFideosMatarazzo from "../assets/products/fideosSpaghettiMatarazzo500.png";
import imgGalletitasOreo from "../assets/products/galletitasOreo118.png";
import imgGarbanzos from "../assets/products/garbanzosMorixe400.png";
import imgHarinaPureza from "../assets/products/harina0000Pureza1000.png";
import imgLentejas from "../assets/products/lentejasEgran500.png";
import imgMayonesa from "../assets/products/mayonesaHellmans.png";
import imgMermelada from "../assets/products/mermeladaDuraznoArcor454.png";
import imgMostaza from "../assets/products/mostazaSavora250.png";
import imgPapasLays from "../assets/products/papasFritasLays134.png";
import imgPimienta from "../assets/products/pimientaNegraMolidaDosAnclas25.png";
import imgPolenta from "../assets/products/polentaPrestoPronta500.png";
import imgPureKnorr from "../assets/products/pureInstantaneoKnorr125.png";
import imgSalCelusal from "../assets/products/salFinaCelusal500.png";
import imgSopaKnorr from "../assets/products/sopaCremaKnorr60.png";
import imgStevia from "../assets/products/steviaPolvoHileret50.png";
import imgDulceDeLeche from "../assets/products/dLecheEstiloColonialLaSerenisima400.png";
import imgAguaGas from "../assets/products/aguaMineralConGasSoda1500.png";
import imgAguaSinGas from "../assets/products/aguaMineralSinGasVillavicencio1500.png";
import imgAmargoTerma from "../assets/products/amargoSerranoTerma1250.png";
import imgStella from "../assets/products/cervezaPilsenStellaArtois1000.png";
import imgQuilmes from "../assets/products/cervezaRubiaQuilmes1000.png";
import imgCocaCola from "../assets/products/cocaCola2250.png";
import imgFernet from "../assets/products/fernetBranca750.png";
import imgGatorade from "../assets/products/bebidaIsotonicaGatorade500.png";
import imgSprite from "../assets/products/sprite2250.png";

type Categoria = "Todos" | "Pollería" | "Almacén" | "Lácteos" | "Bebidas" | "Fiambres" | "Congelados" | "Limpieza";

interface Producto {
  nombre: string;
  precio: string;
  categoria: Categoria;
  desc: string;
  img: string;
  stockNumber?: number;
  stock?: boolean;
}

const productos: Producto[] = [



  // Pollería nuevos
  { nombre: "Alitas de Pollo x kg", categoria: "Pollería", precio: "$2.800", stockNumber: 15, desc: "Alitas de pollo frescas del día, ideales para hacer al horno, fritas o a la parrilla. Tiernas, jugosas y con piel crocante. Perfectas para picadas, reuniones o la cena familiar. Corte fresco, sin congelar.", img: imgAlitas },
  { nombre: "Medio Pollo x kg", categoria: "Pollería", precio: "$3.200", stockNumber: 12, desc: "Medio pollo fresco cortado al medio, ideal para horno o parrilla. Rendidor y económico para toda la familia. Carne tierna y jugosa, faenado en el día. Acompañalo con papas al horno o ensalada para una comida completa.", img: imgMedioPollo },
  { nombre: "Milanesa de Pollo x kg", categoria: "Pollería", precio: "$3.800", stockNumber: 14, desc: "Milanesas de pollo apanadas artesanalmente, listas para freír o al horno. Finas, crocantes y tiernas por dentro. Ideales para el almuerzo o cena de toda la familia. Sin conservantes, elaboradas con pechuga de pollo fresca del día.", img: imgMilaPollo },
  { nombre: "Pata Muslo x kg", categoria: "Pollería", precio: "$2.600", stockNumber: 18, desc: "Pata muslo de pollo fresco, el corte más jugoso y rendidor. Ideal para horno, parrilla, guisos o cazuela. Carne tierna con hueso que aporta sabor a cualquier preparación. Faenado en el día, sin congelar.", img: imgPataMusloNew },
  { nombre: "Pata de Pollo x kg", categoria: "Pollería", precio: "$2.200", stockNumber: 20, desc: "Patas de pollo frescas, tiernas y sabrosas. Ideales para horno, guisos, sopas y caldos. Corte económico y rendidor, perfecto para preparaciones de cocción lenta. Frescura garantizada, faenado en el día.", img: imgPataPollo },
  { nombre: "Pechugas de Pollo x kg", categoria: "Pollería", precio: "$4.200", stockNumber: 16, desc: "Pechugas de pollo frescas sin hueso, el corte más magro y versátil. Ideales para milanesas, al horno, a la plancha, rellenas o en tiras salteadas. Alto en proteínas y bajo en grasas. Frescura del día garantizada.", img: imgPechugas },
  { nombre: "Pollo Entero x kg", categoria: "Pollería", precio: "$3.800", stockNumber: 10, desc: "Pollo entero fresco, faenado en el día. Aprox. 2.5kg. Ideal para horno con papas, a la parrilla o hervido para caldo. Piel dorada y carne jugosa. El clásico infaltable de la mesa familiar cordobesa. Precio por kg.", img: imgPolloEnteroNew },

  // Lácteos
  { nombre: "Yogur Arándano Tregar 900g", categoria: "Lácteos", precio: "$2.800", stockNumber: 18, desc: "Yogur entero sabor arándano Tregar, bolsa de 900g. Cremoso, suave y con el sabor intenso a frutos del bosque. Rico en calcio y proteínas. Ideal para el desayuno, merienda o como base de postres y smoothies.", img: imgYogurTregar },
  { nombre: "Leche Fresca Clásica La Serenísima 1L", categoria: "Lácteos", precio: "$1.200", stockNumber: 30, desc: "Leche fresca clásica La Serenísima, sachet de 1 litro. Con 9 nutrientes esenciales para el bienestar de toda la familia. Entera, de sabor suave y textura cremosa. La leche más elegida por los hogares argentinos.", img: imgLecheSachet },
  { nombre: "Manteca Clásica La Serenísima 200g", categoria: "Lácteos", precio: "$2.100", stockNumber: 22, desc: "Manteca clásica La Serenísima, pan de 200g. Sin TACC, elaborada con crema de leche seleccionada. Sabor suave y textura untuosa perfecta para untar, cocinar y hornear. Certificado de bienestar animal. La manteca de calidad premium de la marca láctea más reconocida de Argentina.", img: imgManteca },

  // Fiambres
  { nombre: "Jamón Cocido Lario Feteado 150g", categoria: "Fiambres", precio: "$2.400", stockNumber: 20, desc: "Jamón cocido feteado Lario, de primera calidad. Paquete de 150g listo para usar. Sabor suave y textura tierna. Ideal para sándwiches, tostadas, pizzas caseras o acompañar quesos en una picada. Conservar en heladera una vez abierto.", img: imgJamonCocido },
  { nombre: "Salame La Piamontesa x kg", categoria: "Fiambres", precio: "$5.800", stockNumber: 8, desc: "Salame estilo piamontés La Piamontesa, elaborado con carne seleccionada y especias naturales. Curado artesanalmente, sabor intenso y picante suave. Ideal para picadas, sándwiches o tablas de fiambres. Cortado al momento a pedido del cliente.", img: imgSalame },

  // Congelados
  { nombre: "Medallones Paty Finitas x2", categoria: "Congelados", precio: "$2.800", stockNumber: 18, desc: "Medallones de carne vacuna Paty Finitas, pack x2 de 193g. Finitas, jugosas y con el sabor inconfundible de Paty. Ideales para hamburguesas caseras, sándwiches o a la plancha. Listas en minutos, directas del freezer a la sartén.", img: imgMedallonesPaty },
  { nombre: "Medallón Vegetariano Swift Calabaza y Choclo x4", categoria: "Congelados", precio: "$3.200", stockNumber: 14, desc: "Medallones vegetarianos Swift de calabaza y choclo, pack x4 de 300g. Prefrito supercongelado, listo en minutos al horno o sartén. Opción nutritiva y sabrosa para toda la familia. Apto vegetarianos.", img: imgMedallonVegetariano },

  // Limpieza
  { nombre: "Detergente Gigante Limón", categoria: "Limpieza", precio: "$1.800", stockNumber: 22, desc: "Detergente lavavajillas Gigante sabor limón. Fórmula concentrada con triple poder desengrasante. Aroma fresco a cítrico que perdura. Rinde más con menos producto. Ideal para vajilla, utensilios y superficies de cocina. Botella con tapa dosificadora.", img: imgDetergenteGigante },
  { nombre: "Lavandina Gel Ayudín Floral 750ml", categoria: "Limpieza", precio: "$2.100", stockNumber: 18, desc: "Lavandina en gel Ayudín aroma floral, 750ml. Elimina el 99.9% de virus y bacterias. Ideal para uso directo en baños, cocina y superficies. Gel adherente que actúa donde lo aplicás sin escurrir. Agua lavandina aditivada de máxima efectividad.", img: imgLavandinaGel },
  { nombre: "Lavandina Líquida Ayudín Clásica", categoria: "Limpieza", precio: "$1.600", stockNumber: 25, desc: "Lavandina líquida clásica Ayudín, agua lavandina común. Elimina el 99.9% de virus y bacterias. Ideal para desinfectar pisos, baños, ropa blanca y superficies del hogar. Bidón fácil de usar con asa cómoda. El desinfectante de confianza de los hogares argentinos.", img: imgLavandinaLiquida },
  { nombre: "Jabón Líquido Matic Ecovita Intense", categoria: "Limpieza", precio: "$3.400", stockNumber: 16, desc: "Líquido para lavarropas Ecovita Intense, recarga económica para 30 lavados. Baja espuma, fragancia intensa a flores que perdura en la ropa. Fórmula con poder antiolor. Compatible con lavarropas de carga frontal y superior. Cuida los colores y las fibras de tus prendas.", img: imgLiquidoLavarropas },
  { nombre: "Repelente OFF! Family Aerosol 165ml", categoria: "Limpieza", precio: "$3.800", stockNumber: 12, desc: "Repelente de insectos OFF! Family en aerosol, 165ml. Protección efectiva contra mosquitos, incluso en condiciones de transpiración. Fórmula suave apta para toda la familia. Ideal para usar en exteriores, actividades al aire libre y los días calurosos de Córdoba.", img: imgOffAerosol },
  { nombre: "Detergente Cif Bioactive X5 500ml", categoria: "Limpieza", precio: "$2.600", stockNumber: 20, desc: "Detergente desengrasante Cif Bioactive X5 Poder, 500ml. Nueva fórmula con 5 veces más poder desengrasante. Elimina grasa difícil de ollas, sartenes y vajilla. Aroma fresco, rinde hasta la última gota. El detergente profesional para tu cocina.", img: imgDetergenteCif },

  { nombre: "Aceite Cocinero Girasol 900ml", categoria: "Almacén", precio: "$2.800", stockNumber: 18, desc: "Aceite de girasol Cocinero, ideal para freír, saltear y aderezar. Botella de 900ml con tapa de seguridad. Libre de colesterol, sabor neutro que realza el sabor natural de tus comidas. El aceite más elegido en los hogares argentinos.", img: imgAceiteCocinero },
  { nombre: "Aceto Balsámico Casalta 250ml", categoria: "Almacén", precio: "$3.500", stockNumber: 12, desc: "Aceto balsámico de Módena Casalta, ideal para ensaladas, carnes y salsas gourmet. Sabor intenso y dulce con equilibrio perfecto de acidez. Botella de vidrio de 250ml. Eleva cualquier preparación a otro nivel.", img: imgAcetoBalsamico },
  { nombre: "Arroz Mandisoví Largo Fino 1kg", categoria: "Almacén", precio: "$1.800", stockNumber: 25, desc: "Arroz pulido largo fino Mandisoví calidad 00000. Grano suelto, cocción perfecta y sabor suave. Ideal para guarniciones, arroz con leche o como base de cualquier plato. Rinde para toda la familia. Bolsa de 1kg.", img: imgArrozMandisovi },
  { nombre: "Atún al Natural La Campagnola 170g", categoria: "Almacén", precio: "$2.200", stockNumber: 30, desc: "Atún al natural La Campagnola, libre de gluten y sin TACC. Lata de 170g con atún de primera calidad en agua. Alto en proteínas, bajo en grasas. Perfecto para ensaladas, sándwiches, tartas y pastas. Producto 100% argentino.", img: imgAtunCampagnola },
  { nombre: "Café Instantáneo Nescafé Dolca 170g", categoria: "Almacén", precio: "$4.200", stockNumber: 15, desc: "Café instantáneo Nescafé Dolca Original, elaborado con granos 100% de origen responsable. Frasco de 170g con tapa hermética para conservar el aroma. Sabor balanceado y reconfortante, listo en segundos. El clásico infaltable de la alacena argentina.", img: imgCafeDolca },
  { nombre: "Caramelos Media Hora Bolsa de 200g", categoria: "Almacén", precio: "$1.200", stockNumber: 20, desc: "Caramelos Media Hora surtidos, el clásico golosina argentina de toda la vida. Bolsa de 200g con variedad de sabores frutales. Sin TACC. Ideales para compartir en familia o tener siempre a mano. Sabor auténtico de siempre.", img: imgCaramelos },
  { nombre: "Chocolate Cofler Block Maní 170g", categoria: "Almacén", precio: "$2.600", stockNumber: 14, desc: "Chocolate con leche y maní Cofler Block, la combinación perfecta de chocolate cremoso con maníes enteros tostados. Tableta de 170g. Ideal para comer solo, compartir o usar en repostería. El favorito de chicos y grandes.", img: imgChocolateBlock },
  { nombre: "Copos de Maíz Granix 400g", categoria: "Almacén", precio: "$2.100", stockNumber: 22, desc: "Copos de maíz tradicionales Granix, crujientes y dorados. Bolsa de 400g. Perfectos para el desayuno con leche o yogur, o como ingrediente en recetas dulces y saladas. Sin colorantes artificiales. Fuente de hidratos de carbono para empezar el día con energía.", img: imgCoposGranix },
  { nombre: "Duraznos en Almíbar Arcor 820g", categoria: "Almacén", precio: "$2.900", stockNumber: 16, desc: "Duraznos en almíbar Arcor, seleccionados en su punto óptimo de madurez. Lata de 820g libre de gluten. Ideales para postres, tortas, con helado o solos. Pulpa tierna y jugosa en almíbar suave. Prácticos y deliciosos para tener siempre en la alacena.", img: imgDuraznos },
  { nombre: "Edulcorante Líquido Sweet Hileret 200ml", categoria: "Almacén", precio: "$1.600", stockNumber: 20, desc: "Edulcorante líquido Sweet Hileret, sin calorías y sin azúcar. Frasco dosificador de 200ml. Ideal para endulzar infusiones, postres y preparaciones sin alterar el sabor. Apto para diabéticos y personas que cuidan su alimentación.", img: imgEdulcorante },
  { nombre: "Fideos Spaghetti Matarazzo N°3 500g", categoria: "Almacén", precio: "$1.400", stockNumber: 28, desc: "Fideos spaghetti Matarazzo N°3, elaborados con 100% harina candeal de calidad superior. Paquete de 500g. Cocción perfecta al dente, no se pegan ni se rompen. Ideales para todo tipo de salsas. Con proteínas y vitaminas del trigo. El spaghetti preferido de las familias argentinas.", img: imgFideosMatarazzo },
  { nombre: "Galletitas Oreo 118g", categoria: "Almacén", precio: "$1.800", stockNumber: 24, desc: "Galletitas Oreo clásicas, la galletita favorita de la leche. Paquete de 118g con galletas de chocolate rellenas de crema blanca. Ideales para comer solas, mojar en leche o usar en postres y tortas. El sabor irresistible que atraviesa generaciones.", img: imgGalletitasOreo },
  { nombre: "Garbanzos Morixe 400g", categoria: "Almacén", precio: "$1.700", stockNumber: 18, desc: "Garbanzos Morixe, desde 1901. Legumbre de calidad premium, seleccionada y clasificada. Bolsa de 400g. Ricos en proteínas vegetales y fibra. Ideales para guisos, ensaladas, hummus y cocido. Producto vegano y sin TACC. Cocción rápida con remojo previo.", img: imgGarbanzos },
  { nombre: "Harina 0000 Pureza 1kg", categoria: "Almacén", precio: "$1.500", stockNumber: 22, desc: "Harina 0000 ultra refinada Pureza, con vitamina D. Paquete de 1kg. La harina más fina para repostería, pastas caseras, pan y todo tipo de preparaciones. Textura suave y resultado profesional en cada receta. La preferida por cocineros y amas de casa.", img: imgHarinaPureza },
  { nombre: "Lentejas Egran 500g", categoria: "Almacén", precio: "$1.600", stockNumber: 20, desc: "Lentejas Egran super rápidas, desde 1938. Bolsa de 500g. Ricas en hierro, proteínas y fibra. No requieren remojo previo, cocción en minutos. Ideales para guisos, sopas y ensaladas. Sin TACC, producto 100% natural. Nutritivas y económicas para toda la familia.", img: imgLentejas },
  { nombre: "Mayonesa Hellmann's Clásica", categoria: "Almacén", precio: "$2.400", stockNumber: 17, desc: "Mayonesa clásica Hellmann's, la receta original desde 1913. Doypack con tapa dosificadora. Cremosa, de color amarillo dorado y sabor equilibrado. Ideal para sándwiches, ensaladas, hamburguesas y aderezos. Sin conservantes artificiales. La mayonesa de referencia en Argentina.", img: imgMayonesa },
  { nombre: "Mermelada de Durazno Arcor 454g", categoria: "Almacén", precio: "$2.100", stockNumber: 19, desc: "Mermelada de durazno Arcor, elaborada con fruta seleccionada. Frasco de 454g con tapa hermética. Sabor intenso a durazno natural, textura suave y untable. Perfecta para tostadas, medialunas, tortas y rellenos. Sin conservantes artificiales. El dulzor casero de siempre.", img: imgMermelada },
  { nombre: "Mostaza Savora Original 250g", categoria: "Almacén", precio: "$1.900", stockNumber: 21, desc: "Mostaza Savora Original, el condimento clásico argentino. Doypack de 250g con tapa dosificadora. Sabor característico suave y aromático. Ideal para carnes, choripán, sándwiches y aderezos. Sin TACC. La mostaza argentina por excelencia, infaltable en toda mesa.", img: imgMostaza },
  { nombre: "Papas Fritas Lay's Clásicas 134g", categoria: "Almacén", precio: "$1.800", stockNumber: 25, desc: "Papas fritas clásicas Lay's, crujientes y con el sabor inconfundible de siempre. Bolsa de 134g. Elaboradas con papas seleccionadas y sal. Ideales para el recreo, el partido o cualquier momento de antojo. El snack preferido de Argentina.", img: imgPapasLays },
  { nombre: "Pimienta Negra Molida Dos Anclas 25g", categoria: "Almacén", precio: "$900", stockNumber: 30, desc: "Pimienta negra molida Dos Anclas, especia de calidad superior. Sobre de 25g con cierre hermético para conservar el aroma y la intensidad. Sabor picante y aromático para condimentar carnes, salsas, pastas y ensaladas. Infaltable en toda cocina.", img: imgPimienta },
  { nombre: "Polenta Presto Pronta 500g", categoria: "Almacén", precio: "$1.150", stockNumber: 20, desc: "Polenta instantánea Arcor Presto Pronta. Lista en 1 minuto, sin grumos y con sabor casero. Ideal para acompañar carnes, guisos o disfrutar sola con manteca y queso. Bolsa de 500g. Rinde para toda la familia.", img: imgPolenta },
  { nombre: "Puré Instantáneo Knorr 125g", categoria: "Almacén", precio: "$1.800", stockNumber: 18, desc: "Puré de papas instantáneo Knorr, rinde 4 porciones. Sobre de 125g. Listo en minutos, cremoso y con sabor a papas naturales. Perfecto como guarnición para carnes, milanesas o como plato principal para los más chicos. Sin conservantes artificiales.", img: imgPureKnorr },
  { nombre: "Sal Fina Celusal 500g", categoria: "Almacén", precio: "$950", stockNumber: 35, desc: "Sal fina de mesa Celusal, la marca de confianza de los hogares argentinos. Bolsa de 500g con apertura fácil. Textura fina de disolución rápida, ideal para cocinar y condimentar todo tipo de preparaciones. Yodada y fluorada para contribuir a una alimentación saludable.", img: imgSalCelusal },
  { nombre: "Sopa Crema Knorr Receta del Chef 60g", categoria: "Almacén", precio: "$1.400", stockNumber: 22, desc: "Sopa crema Knorr Receta del Chef, rinde 3 porciones. Sobre de 60g. Lista en minutos, cremosa y con sabor casero auténtico. Disponible en variedad de sabores. Ideal para un almuerzo rápido o una cena reconfortante en los días fríos de Córdoba.", img: imgSopaKnorr },
  { nombre: "Stevia en Polvo Hileret 50g", categoria: "Almacén", precio: "$2.200", stockNumber: 16, desc: "Endulzante natural Stevia en polvo Hileret, libre de gluten. Caja de 50g con el mismo dulzor que el azúcar pero sin calorías. Ideal para infusiones, postres y repostería saludable. Apto para diabéticos. Origen natural de la planta Stevia rebaudiana.", img: imgStevia },
  { nombre: "Dulce de Leche Estilo Colonial La Serenísima 400g", categoria: "Lácteos", precio: "$2.600", stockNumber: 20, desc: "Dulce de leche estilo colonial La Serenísima, sin TACC, libre de lactosa y sin gluten. Pote de 400g. Textura densa y untable, sabor acaramelado intenso y genuino. Perfecto para tostadas, facturas, tortas y postres. La Serenísima, la verdad láctea argentina.", img: imgDulceDeLeche },
  { nombre: "Agua Mineral Con Gas Soda 1.5L", categoria: "Bebidas", precio: "$1.100", stockNumber: 30, desc: "Agua mineral con gas Bon Aqua 1.5 litros. Burbujas finas y refrescantes, ideal para acompañar comidas, preparar aperitivos o disfrutar sola. Botella de 1.5L fácil de transportar. Hidratación con el toque efervescente que te gusta.", img: imgAguaGas },
  { nombre: "Agua Mineral Sin Gas Villavicencio 1.5L", categoria: "Bebidas", precio: "$1.000", stockNumber: 35, desc: "Agua mineral natural sin gas Villavicencio, desde las sierras de Mendoza. Botella de 1.5L. Pureza natural, sabor limpio y fresco. Ideal para hidratarse durante el día, el deporte o las comidas. La marca de agua más reconocida de Argentina.", img: imgAguaSinGas },
  { nombre: "Amargo Serrano Terma 1.25L", categoria: "Bebidas", precio: "$2.800", stockNumber: 18, desc: "Amargo Serrano Terma, la bebida amarga cordobesa por excelencia. Botella de 1.25L. Elaborada con hierbas serranas naturales, sabor intenso y característico. Ideal para tomar sola, con hielo o mezclada. La bebida que representa el espíritu de Córdoba en cada sorbo.", img: imgAmargoTerma },
  { nombre: "Cerveza Stella Artois Pilsen 1L", categoria: "Bebidas", precio: "$2.500", stockNumber: 24, desc: "Cerveza Stella Artois Pilsen de origen belga. Botella de 1 litro. Sabor suave, refrescante y equilibrado con lúpulo europeo seleccionado. Ideal para acompañar asados, reuniones y momentos especiales. Servir bien fría entre 3° y 5°C para disfrutar su mejor sabor.", img: imgStella },
  { nombre: "Cerveza Quilmes Clásica 1L", categoria: "Bebidas", precio: "$2.200", stockNumber: 28, desc: "Cerveza Quilmes Clásica, la cerveza rubia argentina de siempre. Botella retornable de 1 litro. Sabor suave, dorado y refrescante. Infaltable en los asados y reuniones cordobesas. Temperatura ideal de consumo: bien fría. El sabor del encuentro argentino desde 1890.", img: imgQuilmes },
  { nombre: "Coca Cola 2.25L", categoria: "Bebidas", precio: "$2.400", stockNumber: 30, desc: "Coca Cola original en botella familiar de 2.25 litros. La gaseosa más famosa del mundo, sabor inconfundible y refrescante. Ideal para acompañar comidas, pizzas, asados y reuniones familiares. Servir bien fría con hielo para disfrutarla al máximo.", img: imgCocaCola },
  { nombre: "Fernet Branca 750ml", categoria: "Bebidas", precio: "$8.500", stockNumber: 14, desc: "Fernet Branca original, el aperitivo italiano que conquistó Córdoba. Botella de 750ml elaborada con más de 27 hierbas naturales. Sabor intenso, amargo y aromático. El clásico cordobés para mezclar con Coca Cola. Símbolo indiscutido de la cultura del entretenimiento argentino.", img: imgFernet },
  { nombre: "Gatorade Naranja 500ml", categoria: "Bebidas", precio: "$1.600", stockNumber: 22, desc: "Bebida isotónica Gatorade sabor naranja. Botella de 500ml. Repone electrolitos y minerales perdidos durante el ejercicio o el calor. Con sodio y potasio para una hidratación efectiva. Ideal para deportes, actividades físicas o los días calurosos de Córdoba.", img: imgGatorade },
  { nombre: "Sprite 2.25L", categoria: "Bebidas", precio: "$2.200", stockNumber: 26, desc: "Sprite lima-limón en botella familiar de 2.25 litros. Gaseosa sin cafeína, refrescante y de sabor cítrico intenso. Ideal para acompañar comidas, mezclar con tragos o disfrutar sola con hielo. La opción perfecta para quienes prefieren una gaseosa clara y liviana.", img: imgSprite },
];

const categorias: Categoria[] = ["Todos", "Pollería", "Almacén", "Lácteos", "Bebidas", "Fiambres", "Congelados", "Limpieza"];

const Catalogo = () => {
  const [cat, setCat] = useState<Categoria>("Todos");
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const [modalQuantity, setModalQuantity] = useState<number>(1);
  const { addToCart } = useCart();
  
  const filtered = cat === "Todos" ? productos : productos.filter((p) => p.categoria === cat);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProduct(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setModalQuantity(1);
    }
  }, [selectedProduct]);

  const handleAddToCartFromModal = (p: Producto) => {
    addToCart({ nombre: p.nombre, precio: p.precio }, modalQuantity);
    setSelectedProduct(null);
  };

  return (
    <section id="catalogo" className="bg-section-alt py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary text-center mb-8">
          NUESTROS PRODUCTOS
        </h2>

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categorias.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`font-heading text-sm font-bold px-4 py-2 rounded-full transition-colors ${
                cat === c ? "pill-active" : "pill-inactive"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Cards Compactas Niv.1 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {filtered.map((p) => (
            <div 
              key={p.nombre} 
              className="bg-white rounded-[12px] overflow-hidden cursor-pointer group hover:shadow-md transition-all border border-[#e0e0e0] flex flex-col h-full"
              onClick={() => setSelectedProduct(p)}
            >
              <div className="w-full aspect-square bg-[#FAFAFA] p-[12px] flex items-center justify-center">
                <img src={p.img} alt={p.nombre} className="w-full h-full object-contain transition-transform group-hover:scale-[1.03]" loading="lazy" />
              </div>
              <div className="p-4 flex flex-col flex-1 text-center items-center justify-center border-t border-[#f0f0f0]">
                <span className="badge-category mb-2">
                  {p.categoria}
                </span>
                <h3 className="font-body text-[15px] font-medium text-[#222222] leading-tight text-center">
                  {p.nombre}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Niv.2 */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={() => setSelectedProduct(null)} />
          <div className="relative bg-white w-full max-w-[95%] md:max-w-4xl rounded-[12px] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors border shadow-sm text-gray-700"
              aria-label="Cerrar modal"
            >
              <X size={24} />
            </button>
            
            {/* Image Col */}
            <div className="w-full md:w-1/2 bg-[#FAFAFA] p-[12px] flex items-center justify-center min-h-[300px] md:min-h-0 border-b md:border-b-0 md:border-r border-[#e0e0e0]">
              <img src={selectedProduct.img} alt={selectedProduct.nombre} className="w-full h-full object-contain" />
            </div>
            
            {/* Info Col */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
              <div className="flex-1">
                <span className="badge-category mb-4 inline-block">
                  {selectedProduct.categoria}
                </span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#222222] leading-tight mb-4">
                  {selectedProduct.nombre}
                </h2>
                <p className="font-body text-[#555555] text-base leading-relaxed mb-6">
                  {selectedProduct.desc}
                </p>
                
                <div className="h-[1px] bg-[#e0e0e0] w-full mb-6" />
                
                <div className="flex items-center gap-2 mb-4">
                  <span className={`font-semibold text-sm ${selectedProduct.stockNumber !== 0 || selectedProduct.stock ? 'text-[#2E7D32]' : 'text-[#888888]'}`}>
                    {selectedProduct.stockNumber ? `Disponible · ${selectedProduct.stockNumber} unidades` : (selectedProduct.stock ? 'Disponible ✓' : 'Sin stock')}
                  </span>
                </div>
                
                <div className="mb-8">
                  <span className="font-heading text-3xl md:text-4xl font-bold text-[#CC0000]">
                    {selectedProduct.precio}
                  </span>
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-4">
                <div className="flex items-center justify-center gap-4 bg-white border border-[#e0e0e0] rounded-xl p-1 w-full max-w-[240px] mx-auto shadow-sm">
                  <button
                    onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#555555] hover:bg-[#F5F5F5] rounded-lg transition-colors"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="font-body flex-1 text-center text-[18px] font-bold text-[#222222]">
                    {modalQuantity}
                  </span>
                  <button
                    onClick={() => {
                      const maxStock = selectedProduct.stockNumber ?? Infinity;
                      if (modalQuantity < maxStock) {
                        setModalQuantity(modalQuantity + 1);
                      }
                    }}
                    disabled={selectedProduct.stockNumber !== undefined && modalQuantity >= selectedProduct.stockNumber}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#555555] hover:bg-[#F5F5F5] rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <button
                  onClick={() => handleAddToCartFromModal(selectedProduct)}
                  disabled={selectedProduct.stockNumber === 0 && !selectedProduct.stock}
                  className="bg-[#CC0000] text-[#FFFFFF] w-full min-h-[48px] rounded-[8px] font-bold text-lg hover:bg-[#b30000] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <ShoppingCart size={22} />
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Catalogo;

