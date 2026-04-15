import { MessageCircle, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

import imgPolloEntero from "../assets/products/pollo_entero_1775090313623.png";
import imgPackAlmacen from "../assets/products/pack_almacen_1775092426601.png";

const ofertas = [
  { nombre: "Pollo Entero", antes: "$4.500", ahora: "$3.800", desc: "Fresco del día, aprox 2.5kg", img: imgPolloEntero },
  { nombre: "Pack Almacén", antes: "$12.000", ahora: "$9.900", desc: "Arroz, aceite, fideos, harina y más", img: imgPackAlmacen },
];

const Ofertas = () => {
  const { addToCart } = useCart();
  
  return (
  <section id="ofertas" className="bg-background py-16">
    <div className="container mx-auto px-4">
      <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary text-center mb-10">
        OFERTAS DE LA SEMANA
      </h2>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {ofertas.map((o) => (
          <div key={o.nombre} className="card-market p-6 relative flex flex-col h-full overflow-hidden">
            <span className="badge-offer absolute top-4 right-4 z-10">OFERTA</span>
            <div className="w-full h-48 mb-4 rounded-md overflow-hidden relative bg-white flex items-center justify-center">
              <img src={o.img} alt={o.nombre} className="w-full h-full object-cover" loading="lazy" />
            </div>
            
            <div className="flex-1 flex flex-col">
              <h3 className="font-body text-xl font-medium text-[#222222] mt-2 mb-1 uppercase">{o.nombre}</h3>
              <p className="font-body text-[#666666] text-sm leading-snug">{o.desc}</p>
              <div className="mt-auto pt-4 pb-4 flex items-baseline gap-3">
                <span className="font-heading text-2xl font-bold text-[#CC0000]">{o.ahora}</span>
                <span className="font-body text-sm text-[#999999] line-through">{o.antes}</span>
              </div>
            <button
              onClick={() => addToCart({ nombre: `Oferta: ${o.nombre}`, precio: o.ahora })}
              className="btn-primary-market w-full text-sm"
            >
              <ShoppingCart size={16} />
              Agregar al Carrito
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default Ofertas;
