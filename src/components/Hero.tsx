import heroImg from "@/assets/hero_despensa.png";

const Hero = () => (
  <section id="inicio" className="bg-background">
    <div className="container mx-auto grid md:grid-cols-2 items-center gap-6 md:gap-8 py-8 md:py-16 lg:py-20 px-4">
      {/* Text */}
      <div className="order-2 md:order-1 flex flex-col items-center text-center">
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-[#CC0000] tracking-tight flex flex-col items-center gap-3 md:gap-5 lg:gap-8">
          <span>DESPENSA Y</span>
          <span>POLLERÍA</span>
        </h1>
        <h2 className="mt-4 md:mt-6 font-heading text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#555555] font-bold tracking-tight">
          Calidad, frescura y los mejores precios
        </h2>
        <h3 className="mt-3 md:mt-4 font-body text-sm sm:text-base md:text-lg text-[#555555] font-medium max-w-lg leading-relaxed px-2 md:px-0">
          Agregá productos al carrito, enviá tu pedido por WhatsApp y nosotros te lo llevamos (hasta 10km)!
        </h3>
      </div>

      {/* Image */}
      <div className="order-1 md:order-2 px-2 sm:px-4 md:px-0">
        <img
          src={heroImg}
          alt="Pollo fresco y mercadería de Almacén"
          width={1024}
          height={768}
          className="w-full h-auto rounded-2xl shadow-xl"
        />
      </div>
    </div>
  </section>
);

export default Hero;
