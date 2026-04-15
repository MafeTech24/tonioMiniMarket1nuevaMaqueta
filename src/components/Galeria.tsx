import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const images = [
  { src: gallery1, alt: "Pollo grillado fresco" },
  { src: gallery2, alt: "Almacén surtido" },
  { src: gallery4, alt: "Huevos y lácteos" },
];

const Galeria = () => (
  <section id="galeria" className="bg-background py-16">
    <div className="container mx-auto px-4">
      <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary text-center mb-10">
        GALERÍA
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {images.map((img) => (
          <div
            key={img.alt}
            className="group relative overflow-hidden rounded-lg border border-secondary/20"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              width={640}
              height={640}
              className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/30 transition-colors duration-300 flex items-end">
              <span className="font-body text-sm font-semibold text-transparent group-hover:text-primary-foreground p-3 transition-colors duration-300">
                {img.alt}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Galeria;
