# Tonio MiniMarket - Despensa & Pollería

Plataforma de comercio electrónico frontend desarrollada en **React** y **Vite**, para "Tonio MiniMarket" ubicado en Barrio Las Palmas, Córdoba, Argentina. El sitio está diseñado como una web de una sola página (Landing Page), ágil y moderna, optimizado para conversión rápida.

## 🚀 Características Principales

- **Catálogo de Productos:** Integración de componentes para pollería, almacén y lácteos.
- **Carrito de Compras Global:** Sistema de carrito persistente mediante el Context API de React que permite sumar, restar productos y visualizar subtotales en tiempo real (vía Componente estilo "Drawer").
- **Checkout Integrado por WhatsApp:** Finalizar una orden redacta y formatea automáticamente un listado de los ítems y cálculos totales, para enviarlo de inmediato a través de un mensaje directo con el dueño del nivel.
- **Responsive Web Design:** Diseño adaptable a dispositivos móviles, tablets y de escritorio (Mobile First approach).
- **Integración con Google Maps:** Integración de *iframe* embebido garantizando la fácil y visible ubicación del local físico.

## 🛠 Instalación y Configuración

El proyecto está creado utilizando [Vite](https://vitejs.dev/) y [React](https://reactjs.org/) con [TypeScript](https://www.typescriptlang.org/).

1. **Clonar el Repositorio** (O descargar en archivo local).
2. Instalar las dependencias:
   ```bash
   npm install
   ```
3. Levantar el entorno de desarrollo local:
   ```bash
   npm run dev
   ```

## 🏗 Estructura del Código

- `/src/assets/`: Contiene todas las imágenes en alta resolución y gráficas fotográficas generadas por IA de los distintos productos que comercializa el negocio.
- `/src/components/`: La mayoría de las Vistas del frontend modularizadas (`Hero.tsx`, `Navbar.tsx`, `Catalogo.tsx`, `Cart.tsx`, `Horarios.tsx`, `Footer.tsx`...).
- `/src/context/`: Manejo de Estado global (`CartContext.tsx`) que gobierna el panel deslizable del carrito.

## 🎨 Aspectos Técnicos
- Sistema de clases con **Tailwind CSS**.
- Uso de componentes accesibles y primitivos de interfaces de barra.
- Iconografía provista por `lucide-react`.

## 📍 Contacto Comercial

- **Dirección:** Falucho 275, Bº Las Palmas. Córdoba Capital, Argentina.
- **WhatsApp Oficial:** +54 9 3516 52-7241


- **Sitio Realizado por:** MafeTech
