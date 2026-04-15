import { Truck, Clock, ShieldCheck, ThumbsUp } from "lucide-react";

const items = [
  { icon: Truck, text: "Envío a Domicilio (hasta 10km)" },
  { icon: Clock, text: "Atención rápida" },
  { icon: ShieldCheck, text: "Calidad garantizada" },
  { icon: ThumbsUp, text: "Clientes satisfechos" },
];

const TrustStrip = () => (
  <section className="bg-trust py-8">
    <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
      {items.map(({ icon: Icon, text }) => (
        <div key={text} className="flex flex-col items-center text-center gap-2">
          <Icon size={32} className="text-trust-foreground" />
          <span className="font-body text-sm font-semibold text-trust-foreground">{text}</span>
        </div>
      ))}
    </div>
  </section>
);

export default TrustStrip;
