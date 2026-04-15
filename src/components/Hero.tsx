import heroImg from "@/assets/hero_despensa.png";

const Hero = () => (
  <section id="inicio" className="bg-background">
    <div className="container mx-auto grid md:grid-cols-2 items-center gap-8 py-12 md:py-20 px-4">
      {/* Text */}
      <div className="order-2 md:order-1 flex flex-col items-center text-center">
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-extrabold text-[#CC0000] tracking-tight flex flex-col items-center gap-4 md:gap-6 lg:gap-8">
          <span>DESPENSA Y</span>
          <span>POLLERÍA</span>
        </h1>
        <h2 className="mt-8 font-heading text-2xl md:text-3xl lg:text-4xl text-[#555555] font-bold tracking-tight">
          Calidad, frescura y los mejores precios
        </h2>
        <h3 className="mt-4 font-body text-base md:text-lg text-[#555555] font-medium max-w-lg leading-relaxed">
          Agregá productos al carrito, envía tu pedido por WhatsApp y nosotros te lo llevamos!
        </h3>
      </div>

      {/* Image */}
      <div className="order-1 md:order-2">
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
