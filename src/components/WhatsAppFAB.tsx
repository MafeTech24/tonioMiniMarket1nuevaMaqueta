import { MessageCircle } from "lucide-react";

const WA_LINK = "https://wa.me/5493512005107?text=Hola%20Tonio!%20Tengo%20%20una%20consulta%20";

const WhatsAppFAB = () => (
  <a
    href={WA_LINK}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contactar por WhatsApp"
    className="fixed bottom-6 right-6 z-50 bg-whatsapp text-primary-foreground p-4 rounded-full shadow-lg hover:scale-110 transition-transform animate-float"
  >
    <MessageCircle size={28} />
  </a>
);

export default WhatsAppFAB;
