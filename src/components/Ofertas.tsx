import { ShoppingCart, Plus, Minus, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import imgPolloEntero from "../assets/products/pollo_entero_1775090313623.png";
import imgPackAlmacen from "../assets/products/pack_almacen_1775092426601.png";
import imgPromoTarta1 from "../assets/products/promoTarta1.png";
import imgPromoTarta2 from "../assets/products/promoTarta2.png";
import imgPromoTarta3 from "../assets/products/promoTarta3.png";

const ofertas = [
  { 
    nombre: "Promo Tarta", 
    antes: "$7.500", 
    ahora: "$6.000", 
    desc: "Combo ideal: 1 Pascualina San Vicente + 200g Jamón Cocido + 200g Queso Cremoso + 2 Huevos. ¡Todo listo para cocinar en familia!", 
    images: [imgPromoTarta1, imgPromoTarta2, imgPromoTarta3],
    stock: 10,
    categoria: "Almacén"
  },
  { 
    nombre: "Pollo Entero", 
    antes: "$4.500", 
    ahora: "$3.800", 
    desc: "Fresco del día, aprox 2.5kg", 
    img: imgPolloEntero,
    stock: 12,
    categoria: "Pollería"
  },
  { 
    nombre: "Pack Almacén", 
    antes: "$12.000", 
    ahora: "$9.900", 
    desc: "Arroz, aceite, fideos, harina y más", 
    img: imgPackAlmacen,
    stock: 15,
    categoria: "Almacén"
  },
];

const Ofertas = () => {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(ofertas.map(o => [o.nombre, 1]))
  );
  const [selectedOffer, setSelectedOffer] = useState<any | null>(null);
  const [modalQuantity, setModalQuantity] = useState<number>(1);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedOffer(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (selectedOffer) {
      setModalQuantity(quantities[selectedOffer.nombre] || 1);
    }
  }, [selectedOffer]);

  const updateQuantity = (nombre: string, delta: number, max: number) => {
    setQuantities(prev => ({
      ...prev,
      [nombre]: Math.min(max, Math.max(1, prev[nombre] + delta))
    }));
  };

  const handleAddToCartFromModal = (o: any) => {
    addToCart({ nombre: `Oferta: ${o.nombre}`, precio: o.ahora }, modalQuantity);
    setSelectedOffer(null);
  };
  
  return (
  <section id="ofertas" className="bg-background py-16">
    <div className="container mx-auto px-4">
      <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary text-center mb-10">
        OFERTAS DE LA SEMANA
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {ofertas.map((o) => (
          <div key={o.nombre} className="card-market p-6 relative flex flex-col h-full overflow-hidden cursor-pointer group" onClick={() => setSelectedOffer(o)}>
            <span className="badge-offer absolute top-4 right-4 z-10">OFERTA</span>
            
            <div className="w-full h-48 sm:h-56 mb-4 rounded-md overflow-hidden relative bg-white">
              {'images' in o ? (
                <Carousel className="w-full h-full group/carousel">
                  <CarouselContent className="h-full -ml-0">
                    {o.images.map((img: string, idx: number) => (
                      <CarouselItem key={idx} className="h-full pl-0 basis-full">
                        <img src={img} alt={`${o.nombre} ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
                    <div className="pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                      <CarouselPrevious className="static translate-y-0 bg-white/90 hover:bg-white z-40 opacity-100 sm:opacity-0 sm:group-hover/carousel:opacity-100 transition-opacity h-10 w-10" />
                    </div>
                    <div className="pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                      <CarouselNext className="static translate-y-0 bg-white/90 hover:bg-white z-40 opacity-100 sm:opacity-0 sm:group-hover/carousel:opacity-100 transition-opacity h-10 w-10" />
                    </div>
                  </div>
                </Carousel>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <img src={(o as any).img} alt={o.nombre} className="w-full h-full object-cover" loading="lazy" />
                </div>
              )}
            </div>
            
            <div className="flex-1 flex flex-col pt-2 text-center">
              <h3 className="font-body text-lg md:text-xl font-bold text-[#222222] uppercase tracking-wide mb-1">{o.nombre}</h3>
              <div className="flex items-center justify-center gap-3">
                <span className="font-heading text-xl font-bold text-[#CC0000]">{o.ahora}</span>
                <span className="font-body text-sm text-[#999999] line-through">{o.antes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Ofertas */}
      {selectedOffer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={() => setSelectedOffer(null)} />
          <div className="relative bg-white w-full max-w-[98%] sm:max-w-[90%] md:max-w-4xl rounded-[12px] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92vh] md:max-h-[85vh]">
            <button 
              onClick={() => setSelectedOffer(null)} 
              className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors border shadow-sm text-gray-700"
              aria-label="Cerrar modal"
            >
              <X size={24} />
            </button>
            
            <div className="w-full md:w-1/2 bg-[#FAFAFA] p-[12px] flex items-center justify-center min-h-[200px] sm:min-h-[260px] md:min-h-0 border-b md:border-b-0 md:border-r border-[#e0e0e0] max-h-[40vh] md:max-h-none relative">
              {'images' in selectedOffer ? (
                <Carousel className="w-full h-full">
                  <CarouselContent>
                    {selectedOffer.images.map((img: string, idx: number) => (
                      <CarouselItem key={idx} className="flex items-center justify-center">
                        <img src={img} alt={selectedOffer.nombre} className="w-full h-full object-contain max-h-[36vh] md:max-h-none" />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                    <div className="pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                      <CarouselPrevious className="static translate-y-0 bg-white/80 hover:bg-white z-40 h-12 w-12" />
                    </div>
                    <div className="pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                    <CarouselNext className="static translate-y-0 bg-white/80 hover:bg-white z-40 h-12 w-12" />
                    </div>
                  </div>
                </Carousel>
              ) : (
                <img src={(selectedOffer as any).img} alt={selectedOffer.nombre} className="w-full h-full object-contain max-h-[36vh] md:max-h-none" />
              )}
            </div>
            
            <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-10 flex flex-col overflow-y-auto">
              <div className="flex-1">
                <span className="badge-offer mb-4 inline-block">OFERTA</span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#222222] leading-tight mb-4 uppercase">
                  {selectedOffer.nombre}
                </h2>
                <p className="font-body text-[#555555] text-base leading-relaxed mb-6">
                  {selectedOffer.desc}
                </p>
                
                <div className="h-[1px] bg-[#e0e0e0] w-full mb-6" />
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-green-600 font-bold">
                    ✓ Disponible · {selectedOffer.stock} unidades
                  </span>
                </div>
                
                <div className="mb-8 flex items-baseline gap-4">
                  <span className="font-heading text-3xl md:text-4xl font-bold text-[#CC0000]">
                    {selectedOffer.ahora}
                  </span>
                  <span className="font-body text-xl text-gray-400 line-through">
                    {selectedOffer.antes}
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
                    onClick={() => setModalQuantity(Math.min(selectedOffer.stock, modalQuantity + 1))}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#555555] hover:bg-[#F5F5F5] rounded-lg transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <button
                  onClick={() => handleAddToCartFromModal(selectedOffer)}
                  className="bg-[#CC0000] text-[#FFFFFF] w-full min-h-[48px] rounded-[8px] font-bold text-lg hover:bg-[#b30000] transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={22} />
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </section>
  );
};

export default Ofertas;
