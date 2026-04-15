import { Clock, MapPin, Phone } from "lucide-react";

const Horarios = () => (
  <section id="horarios" className="bg-section-alt py-16">
    <div className="container mx-auto px-4">
      <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary text-center mb-10">
        HORARIOS Y UBICACIÓN
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Info */}
        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <Clock size={28} className="text-primary shrink-0 mt-1" />
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground">Horarios de Atención</h3>
              <p className="font-body text-muted-foreground">Lunes a Viernes: 8 hs a 13:30 hs - 17 hs a 21 hs</p>
              <p className="font-body text-muted-foreground">Sábados y Feriados: 8:30 hs a 13:30 hs - 17 hs a 21 hs</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <MapPin size={28} className="text-primary shrink-0 mt-1" />
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground">Dirección</h3>
              <p className="font-body text-muted-foreground">Falucho 275, Bº Las Palmas.<br/>Córdoba Capital, Argentina.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <Phone size={28} className="text-primary shrink-0 mt-1" />
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground">Teléfono / WhatsApp</h3>
              <p className="font-body text-muted-foreground">3516527241</p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="rounded-lg overflow-hidden border border-border w-full" style={{ minHeight: '260px' }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.4101221071382!2d-64.24479778959648!3d-31.402824695487222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432995bc585decf%3A0x1f0069122385411f!2sTonio%20Despensa%20y%20polleria!5e0!3m2!1ses!2sar!4v1775100737390!5m2!1ses!2sar" 
            width="100%" 
            height="100%" 
            style={{ border: 0, display: 'block', minHeight: '260px' }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
);

export default Horarios;
