import { useState, FormEvent, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import { ShoppingCart, Plus, Minus, Trash2, MessageCircle, ArrowLeft, CheckCircle2, MapPin, Download } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";

const OWNER_PHONE = "5493512005107";
const STORE_LAT = -31.4028247;
const STORE_LON = -64.2447978;

const formatTotal = (num: number) => {
  return "$" + num.toLocaleString("es-AR");
};

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

type CheckoutStep = 'cart' | 'form' | 'confirmation' | 'success';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, total, itemCount, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [orderNumber, setOrderNumber] = useState("");
  const ticketRef = useRef<HTMLDivElement>(null);
  const [ticketImage, setTicketImage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    deliveryMethod: 'Delivery' as 'Delivery' | 'Retiro en local',
    street: '',
    number: '',
    neighborhood: '',
    paymentMethod: 'Efectivo' as 'Efectivo' | 'Transferencia',
    notes: ''
  });

  const [deliveryCost, setDeliveryCost] = useState<number | null>(null);
  const [deliveryDistance, setDeliveryDistance] = useState<number | null>(null);
  const [isCalculatingDistance, setIsCalculatingDistance] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    phone?: string;
    street?: string;
    number?: string;
    neighborhood?: string;
    general?: string;
  }>({});

  const handleStartCheckout = () => {
    setStep('form');
  };

  const handleAddressBlur = async () => {
    if (formData.deliveryMethod !== 'Delivery') return;
    if (!formData.street.trim() || !formData.number.trim() || !formData.neighborhood.trim()) return;
    
    setIsCalculatingDistance(true);
    setGeoError(null);
    setFormErrors(prev => ({ ...prev, general: undefined }));
    
    try {
      const query = `${formData.street} ${formData.number}, ${formData.neighborhood}, Córdoba`;
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=ar`;
      const res = await fetch(url);
      const data = await res.json();
      
      let lat, lon;

      if (data && data.length > 0) {
        lat = parseFloat(data[0].lat);
        lon = parseFloat(data[0].lon);
      } else {
        const fallbackQuery = `${formData.street}, ${formData.neighborhood}, Córdoba`;
        const fallbackUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fallbackQuery)}&countrycodes=ar`;
        const fallbackRes = await fetch(fallbackUrl);
        const fallbackData = await fallbackRes.json();
        
        if (fallbackData && fallbackData.length > 0) {
          lat = parseFloat(fallbackData[0].lat);
          lon = parseFloat(fallbackData[0].lon);
        }
      }

      if (lat && lon) {
        const dist = calculateDistance(STORE_LAT, STORE_LON, lat, lon);
        const distRounded = Math.round(dist * 10) / 10; // 1 decimal
        setDeliveryDistance(distRounded);
        if (dist <= 2) {
          setDeliveryCost(0);
        } else if (dist <= 6) {
          // $250 per km, charged for total distance rounded up to nearest 0.1km
          const cost = Math.ceil(dist) * 250;
          setDeliveryCost(cost);
        } else {
          setDeliveryCost(null);
          setGeoError("Lo sentimos, por ahora no llegamos a tu zona. Podés retirar en el local.");
        }
      } else {
        setDeliveryCost(null);
        setGeoError("No pudimos encontrar la dirección exacta. Asegurate de que esté bien escrita o elegí retirar en local.");
      }
    } catch(e) {
      setDeliveryCost(null);
      setGeoError("Hubo un error calculando el costo de envío. Intentá de nuevo.");
    } finally {
      setIsCalculatingDistance(false);
    }
  };

  const validateForm = () => {
    const errors: any = {};
    if (!formData.name.trim()) errors.name = "Por favor escribí tu nombre completo";
    if (formData.phone.replace(/\D/g, '').length < 10) errors.phone = "El teléfono necesita al menos 10 números";
    
    if (formData.deliveryMethod === 'Delivery') {
      if (!formData.street.trim()) errors.street = "Escribí la calle donde querés recibir tu pedido";
      if (!formData.number.trim()) errors.number = "Falta el número de tu domicilio";
      if (!formData.neighborhood.trim()) errors.neighborhood = "Escribí tu barrio";
      
      if (geoError) {
        errors.general = "No podemos enviar a tu zona. Por favor cambiá la dirección o elegí Retiro en local.";
      } else if (deliveryCost === null) {
         // Force calculation if user managed to skip blur
         errors.general = "Estamos calculando el envío. Asegurate de escribir la dirección completa y tocar afuera del campo de texto.";
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;
    
    if (!orderNumber) {
      const randomNum = Math.floor(1000 + Math.random() * 9000).toString();
      setOrderNumber(randomNum);
    }
    setStep('confirmation');
  };

  const grandTotal = (formData.deliveryMethod === 'Delivery' && deliveryCost !== null) ? total + deliveryCost : total;

  const handleConfirmAndSend = async () => {
    let capturedDataUrl = ticketImage;

    if (ticketRef.current && !capturedDataUrl) {
      try {
        const canvas = await html2canvas(ticketRef.current, { backgroundColor: '#ffffff', scale: 2 });
        capturedDataUrl = canvas.toDataURL("image/png");
        setTicketImage(capturedDataUrl);
      } catch (err) {
        console.error("Error al generar imagen del ticket:", err);
        return; // Detener si falla crítico? Asumimos okay.
      }
    }

    if (!capturedDataUrl) return;

    const currentDateTime = new Date().toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' });
    let itemsText = cart.map((item) => `- ${item.nombre} x${item.cantidad} — $${(item.precio * item.cantidad).toLocaleString('es-AR')}`).join('\n');

    const addressText = formData.deliveryMethod === 'Delivery' 
      ? `${formData.street} ${formData.number}, ${formData.neighborhood}` 
      : 'Retiro en local';
      
    const enviosText = formData.deliveryMethod === 'Delivery' ? `Envío (Delivery): ${deliveryCost === 0 ? 'Gratis' : formatTotal(deliveryCost!)}` : `Retiro en local`;

    const ownerMessage = `🛒 *NUEVO PEDIDO #${orderNumber}*
📅 ${currentDateTime}

*Productos:*
${itemsText}
📦 *${enviosText}*

💰 *Total: ${formatTotal(grandTotal)}*
📍 *Domicilio:* ${addressText}
💳 *Pago:* ${formData.paymentMethod}
👤 *Cliente:* ${formData.name}
📱 *Teléfono:* ${formData.phone}
📝 *Notas:* ${formData.notes || "Sin notas"}`;

    const customerMessage = `✅ *¡Pedido confirmado! #${orderNumber}*
Hola ${formData.name}, recibimos tu pedido correctamente.

*Productos:*
${itemsText}
📦 *${enviosText}*

💰 *Total: ${formatTotal(grandTotal)}*
💳 *Pago:* ${formData.paymentMethod}
📝 *Notas:* ${formData.notes || "Sin notas"}

¡Gracias por tu compra! 🙌`;

    let cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = cleanPhone.substring(1);
    }
    const finalCustomerPhone = "549" + cleanPhone;

    const ownerWaLink = `https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(ownerMessage)}`;
    const customerWaLink = `https://wa.me/${finalCustomerPhone}?text=${encodeURIComponent(customerMessage)}`;

    window.open(ownerWaLink, "_blank");
    
    setTimeout(() => {
      window.open(customerWaLink, "_blank");
      setStep('success');
    }, 1500);
  };

  const handleDownloadTicket = () => {
    if (ticketImage) {
      const link = document.createElement('a');
      link.download = `comprobante-pedido-${orderNumber}.png`;
      link.href = ticketImage;
      link.click();
    }
  };

  const handleReturnToHome = () => {
    clearCart();
    setIsOpen(false);
    setTimeout(() => {
      setStep('cart');
      setOrderNumber(''); 
      setTicketImage(null);
      setDeliveryCost(null);
      setDeliveryDistance(null);
      setGeoError(null);
      setFormErrors({});
      setFormData({
        name: '', phone: '', deliveryMethod: 'Delivery', street: '', number: '', neighborhood: '', paymentMethod: 'Efectivo', notes: ''
      });
    }, 300);
  };

  const renderStepIndicator = () => {
    if (step === 'cart') return null;
    return (
      <div className="flex items-center justify-center gap-2 py-4 border-b border-border/50 text-[16px] font-semibold">
        <span className={step === 'form' ? 'text-primary' : 'text-muted-foreground'}>Datos</span>
        <span className="text-muted-foreground">→</span>
        <span className={step === 'confirmation' ? 'text-primary' : 'text-muted-foreground'}>Confirmación</span>
        <span className="text-muted-foreground">→</span>
        <span className={step === 'success' ? 'text-primary' : 'text-muted-foreground'}>¡Listo!</span>
      </div>
    );
  };

  const renderHiddenTicket = () => {
    // This div renders off-screen with full explicit height, so html2canvas doesn't truncate scrolling parts
    if (step !== 'confirmation' && step !== 'success') return null;
    return (
      <div style={{ position: 'fixed', left: '-9999px', top: 0 }}>
        <div ref={ticketRef} style={{ width: '400px', backgroundColor: '#ffffff', color: '#000000', padding: '32px', boxSizing: 'border-box' }}>
          <div style={{ textAlign: 'center', borderBottom: '2px solid #f1f5f9', paddingBottom: '20px' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 'bold', color: '#16a34a' }}>Despensa y Pollería Tonio</h3>
            <p style={{ margin: '0', fontSize: '18px', fontWeight: 'bold', color: '#64748b' }}>Pedido #{orderNumber}</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#94a3b8' }}>{new Date().toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' })}</p>
          </div>

          <div style={{ padding: '20px 0', borderBottom: '2px solid #f1f5f9' }}>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold' }}>Productos:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cart.map((item) => (
                <div key={item.nombre} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px' }}>
                  <span style={{ flex: 1, paddingRight: '12px' }}>{item.nombre} x{item.cantidad}</span>
                  <span style={{ fontWeight: 'bold' }}>${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
                </div>
              ))}
              {formData.deliveryMethod === 'Delivery' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', color: '#64748b' }}>
                  <span style={{ flex: 1, paddingRight: '12px' }}>Costo de envío</span>
                  <span style={{ fontWeight: 'bold' }}>{deliveryCost === 0 ? 'Gratis' : (deliveryCost ? formatTotal(deliveryCost) : '-')}</span>
                </div>
              )}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '22px', fontWeight: 'bold', marginTop: '20px', paddingTop: '20px', borderTop: '2px dashed #cbd5e1' }}>
              <span>Total:</span>
              <span style={{ color: '#16a34a' }}>{formatTotal(grandTotal)}</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '16px', paddingTop: '20px' }}>
            <h4 style={{ margin: '0', fontSize: '16px', fontWeight: 'bold' }}>Detalles de Entrega:</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Método:</span>
              <span style={{ fontWeight: 'bold', textAlign: 'right' }}>{formData.deliveryMethod}</span>
            </div>
            {formData.deliveryMethod === 'Delivery' && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Dirección:</span>
                <span style={{ fontWeight: 'bold', textAlign: 'right', maxWidth: '60%' }}>{formData.street} {formData.number}, {formData.neighborhood}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Pago:</span>
              <span style={{ fontWeight: 'bold', textAlign: 'right' }}>{formData.paymentMethod}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Cliente:</span>
              <span style={{ fontWeight: 'bold', textAlign: 'right', maxWidth: '60%' }}>{formData.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Teléfono:</span>
              <span style={{ fontWeight: 'bold', textAlign: 'right' }}>{formData.phone}</span>
            </div>
            {formData.notes && (
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '8px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b', marginBottom: '8px' }}>Notas:</span>
                <span style={{ fontWeight: 'normal', fontStyle: 'italic', fontSize: '16px' }}>"{formData.notes}"</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        setTimeout(() => {
          setStep('cart');
          setOrderNumber(''); // clear on discard
          setTicketImage(null);
        }, 300);
      }
    }}>
      <SheetTrigger asChild>
        <button className="relative min-w-[44px] min-h-[44px] text-navbar-foreground hover:bg-navbar-foreground/10 rounded-full transition-colors flex items-center justify-center">
          <ShoppingCart size={24} />
          {itemCount > 0 && (
            <span className="absolute top-1 right-1 bg-white text-primary text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-primary">
              {itemCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      
      <SheetContent className="flex flex-col w-full sm:max-w-md h-full bg-background/95 backdrop-blur-xl border-l-primary/20 overflow-hidden px-0">
        <div className="px-6">
          <SheetHeader className="text-left mt-4 mb-2">
            <SheetTitle className="font-heading text-2xl text-primary flex items-center gap-2">
              {step !== 'cart' && step !== 'success' && (
                <button onClick={() => setStep(step === 'confirmation' ? 'form' : 'cart')} className="p-1 hover:bg-primary/10 rounded-full transition-colors mr-1">
                  <ArrowLeft size={20} />
                </button>
              )}
              {step === 'success' ? '¡Compra Exitosa!' : 'Tu Carrito'}
            </SheetTitle>
            <SheetDescription className="sr-only">Carrito de compras y el proceso de enviar pedido por WhatsApp</SheetDescription>
          </SheetHeader>
          {renderStepIndicator()}
        </div>

        {renderHiddenTicket()}

        <div className="flex-1 overflow-y-auto py-4 px-6">
          {step === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-60">
                  <ShoppingCart size={64} className="mb-4" />
                  <p className="font-body text-lg">El carrito está vacío</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4 pb-10">
                  {cart.map((item) => (
                    <div key={item.nombre} className="flex flex-col gap-2 p-3 bg-secondary/5 rounded-lg border border-secondary/10">
                      <div className="flex justify-between items-start">
                        <span className="font-heading font-bold text-foreground text-[16px] line-clamp-2">{item.nombre}</span>
                        <button
                          onClick={() => removeFromCart(item.nombre)}
                          className="min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                          aria-label="Eliminar"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-body text-[16px] font-semibold">{item.precioFormateado}</span>
                        <div className="flex items-center gap-1 bg-background border border-primary/20 rounded-md p-1">
                          <button
                            onClick={() => updateQuantity(item.nombre, item.cantidad - 1)}
                            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-primary hover:bg-primary/10 rounded"
                          >
                            <Minus size={20} />
                          </button>
                          <span className="font-body min-w-[28px] text-center text-[16px] font-bold">
                            {item.cantidad}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.nombre, item.cantidad + 1)}
                            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-primary hover:bg-primary/10 rounded"
                          >
                            <Plus size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step === 'form' && (
            <form id="checkout-form" onSubmit={(e) => handleFormSubmit(e)} className="flex flex-col gap-6 pb-10">
              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-bold">Nombre Completo *</label>
                <input 
                  type="text" 
                  className={`px-[14px] py-[14px] text-[16px] border ${formErrors.name ? 'border-red-500' : 'border-border'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50`}
                  placeholder="Ej: Juan Pérez"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({...formData, name: e.target.value});
                    setFormErrors({...formErrors, name: undefined});
                  }}
                />
                {formErrors.name && <span className="text-red-500 text-sm">{formErrors.name}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-bold">Teléfono (Mínimo 10 dígitos) *</label>
                <input 
                  type="tel" 
                  inputMode="numeric"
                  className={`px-[14px] py-[14px] text-[16px] border ${formErrors.phone ? 'border-red-500' : 'border-border'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50`}
                  placeholder="Ej: 3512345678"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({...formData, phone: e.target.value.replace(/\D/g, '')});
                    setFormErrors({...formErrors, phone: undefined});
                  }}
                />
                {formErrors.phone && <span className="text-red-500 text-sm">{formErrors.phone}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-bold">Método de Envío *</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    type="button" 
                    onClick={() => {
                        setFormData({...formData, deliveryMethod: 'Delivery'});
                        setGeoError(null);
                        setDeliveryCost(null);
                        setDeliveryDistance(null);
                    }} 
                    className={`min-h-[52px] text-[16px] rounded-md border font-bold transition-all ${formData.deliveryMethod === 'Delivery' ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-background text-foreground/80 hover:bg-secondary/10'}`}
                  >
                    Delivery
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                        setFormData({...formData, deliveryMethod: 'Retiro en local'});
                        setGeoError(null);
                        setDeliveryCost(null);
                        setDeliveryDistance(null);
                        setFormErrors(prev => ({...prev, street: undefined, number: undefined, neighborhood: undefined, general: undefined}));
                    }} 
                    className={`min-h-[52px] text-[16px] rounded-md border font-bold transition-all ${formData.deliveryMethod === 'Retiro en local' ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-background text-foreground/80 hover:bg-secondary/10'}`}
                  >
                    Retiro en local
                  </button>
                </div>
              </div>

              {formData.deliveryMethod === 'Delivery' && (
                <div className="flex flex-col gap-5 p-5 bg-secondary/5 rounded-xl border border-secondary/10 mt-2">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-col gap-2 w-full sm:w-[65%]">
                      <label className="text-[16px] font-bold">Calle *</label>
                      <input 
                        type="text" 
                        onBlur={handleAddressBlur}
                        className={`px-[14px] py-[14px] text-[16px] border ${formErrors.street ? 'border-red-500' : 'border-border'} rounded-md focus:outline-none`} 
                        placeholder="San Martín" 
                        value={formData.street} 
                        onChange={(e) => {
                            setFormData({...formData, street: e.target.value});
                            setFormErrors({...formErrors, street: undefined, general: undefined});
                        }} 
                      />
                      {formErrors.street && <span className="text-red-500 text-sm leading-tight">{formErrors.street}</span>}
                    </div>
                    <div className="flex flex-col gap-2 w-full sm:w-[35%]">
                      <label className="text-[16px] font-bold">Número *</label>
                      <input 
                        type="text" 
                        inputMode="numeric"
                        onBlur={handleAddressBlur}
                        className={`px-[14px] py-[14px] text-[16px] border ${formErrors.number ? 'border-red-500' : 'border-border'} rounded-md focus:outline-none`} 
                        placeholder="123" 
                        value={formData.number} 
                        onChange={(e) => {
                            setFormData({...formData, number: e.target.value});
                            setFormErrors({...formErrors, number: undefined, general: undefined});
                        }} 
                      />
                      {formErrors.number && <span className="text-red-500 text-sm leading-tight">{formErrors.number}</span>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-[16px] font-bold">Barrio *</label>
                    <input 
                      type="text" 
                      onBlur={handleAddressBlur}
                      className={`px-[14px] py-[14px] text-[16px] border ${formErrors.neighborhood ? 'border-red-500' : 'border-border'} rounded-md focus:outline-none`} 
                      placeholder="Centro" 
                      value={formData.neighborhood} 
                      onChange={(e) => {
                          setFormData({...formData, neighborhood: e.target.value});
                          setFormErrors({...formErrors, neighborhood: undefined, general: undefined});
                      }} 
                    />
                    {formErrors.neighborhood && <span className="text-red-500 text-sm leading-tight">{formErrors.neighborhood}</span>}
                  </div>
                  
                  <div className="mt-2 pt-4 border-t border-secondary/20 flex flex-col gap-2">
                     {isCalculatingDistance && <span className="text-muted-foreground font-semibold flex items-center gap-2"><MapPin size={18} className="animate-bounce" /> Calculando distancia...</span>}
                     {!isCalculatingDistance && geoError && <span className="text-red-600 font-semibold">{geoError}</span>}
                     {!isCalculatingDistance && deliveryCost !== null && !geoError && (
                       <div className="flex flex-col gap-1">
                         <span className="text-muted-foreground text-sm">
                           Distancia estimada: <strong>{deliveryDistance} km</strong>
                         </span>
                         <span className={`font-extrabold text-lg flex items-center gap-2 ${deliveryCost === 0 ? 'text-green-600' : 'text-amber-600'}`}>
                           {deliveryCost === 0
                             ? '✓ Envío gratis (dentro de los 2km)'
                             : `🚴 Costo de envío: ${formatTotal(deliveryCost)} (${Math.ceil(deliveryDistance!)} km × $250/km)`
                           }
                         </span>
                       </div>
                     )}
                  </div>
                </div>
              )}

              {formErrors.general && <div className="bg-red-500/10 text-red-600 p-4 rounded-md font-bold">{formErrors.general}</div>}

              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-bold">Medio de Pago *</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    type="button" 
                    onClick={() => setFormData({...formData, paymentMethod: 'Efectivo'})} 
                    className={`min-h-[52px] text-[16px] rounded-md border font-bold transition-all ${formData.paymentMethod === 'Efectivo' ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-background hover:bg-secondary/10 text-foreground/80'}`}
                  >
                    Efectivo
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setFormData({...formData, paymentMethod: 'Transferencia'})} 
                    className={`min-h-[52px] text-[16px] rounded-md border font-bold transition-all ${formData.paymentMethod === 'Transferencia' ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-background hover:bg-secondary/10 text-foreground/80'}`}
                  >
                    Transferencia
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-bold">Notas (Opcional)</label>
                <textarea 
                  className="px-[14px] py-[14px] text-[16px] border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary/50" 
                  rows={2} 
                  placeholder="Ej: portón negro, tocar timbre, etc."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>
            </form>
          )}

          {step === 'confirmation' && (
            <div className="flex flex-col gap-6 pb-10">
              <p className="text-lg font-bold text-center">Por favor validá que todo esté correcto antes de enviar</p>
              <div className="bg-secondary/5 rounded-xl border border-secondary/10 p-6 font-body flex flex-col gap-6 shadow-sm text-foreground">
                <div className="text-center border-b border-border/50 pb-5">
                  <h3 className="font-heading font-bold text-xl text-primary">Despensa y Pollería Tonio</h3>
                  <p className="text-[16px] font-bold text-muted-foreground mt-2">Pedido #{orderNumber}</p>
                </div>

                <div className="flex flex-col gap-3 border-b border-border/50 pb-5">
                  <h4 className="font-extrabold text-[16px] mb-2 uppercase text-muted-foreground tracking-wider">Productos</h4>
                  {cart.map((item) => (
                    <div key={item.nombre} className="flex justify-between text-[16px]">
                      <span className="line-clamp-1 flex-1 pr-2">{item.nombre} x{item.cantidad}</span>
                      <span className="font-bold">${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
                    </div>
                  ))}
                  {formData.deliveryMethod === 'Delivery' && (
                    <div className="flex justify-between text-[16px] text-muted-foreground mt-2">
                      <span className="flex-1 pr-2">Costo de Envío</span>
                      <span className="font-bold text-foreground">{deliveryCost === 0 ? 'Gratis' : (deliveryCost ? formatTotal(deliveryCost) : '-')}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-black text-2xl mt-4 pt-4 border-t border-dashed border-border/50">
                    <span>Total a pagar:</span>
                    <span className="text-primary">{formatTotal(grandTotal)}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 text-[16px]">
                  <h4 className="font-extrabold text-[16px] uppercase text-muted-foreground tracking-wider mb-2">Detalles de Entrega</h4>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground font-bold">Datos del cliente</span>
                    <span className="font-bold text-lg">{formData.name} <span className="text-muted-foreground text-[16px] font-normal mx-2">|</span> {formData.phone}</span>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground font-bold">Método y Dirección</span>
                    <span className="font-bold text-lg">{formData.deliveryMethod}</span>
                    {formData.deliveryMethod === 'Delivery' && (
                        <span className="font-semibold text-muted-foreground">{formData.street} {formData.number}, {formData.neighborhood}</span>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground font-bold">Forma de pago</span>
                    <span className="font-bold text-lg">{formData.paymentMethod}</span>
                  </div>

                  {formData.notes && (
                    <div className="flex flex-col mt-3 pt-4 border-t border-border/50">
                      <span className="text-sm text-muted-foreground font-bold mb-1">Notas al pedido</span>
                      <span className="font-medium italic">"{formData.notes}"</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 'success' && ticketImage && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-6 py-8">
              <CheckCircle2 size={80} className="text-green-500" />
              <h2 className="font-heading text-3xl font-bold text-primary">¡Pedido enviado!</h2>
              <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-xl border my-2 bg-white flex flex-col">
                <img src={ticketImage} alt="Comprobante de compra" className="w-full object-contain" />
              </div>
              <button
                onClick={handleDownloadTicket}
                className="w-full bg-green-600 text-white flex items-center justify-center gap-3 min-h-[56px] text-lg font-bold rounded-xl shadow-lg hover:bg-green-700 transition-colors"
              >
                  <Download size={24} />
                  Guardar comprobante
              </button>
            </div>
          )}
        </div>

        <div className="border-t px-6 py-5 bg-background shrink-0 shadow-[0_-10px_15px_rgba(0,0,0,0.03)] z-10">
          {step === 'cart' && (
            <>
              <div className="flex justify-between items-center mb-5">
                <span className="font-heading text-xl font-bold">Total:</span>
                <span className="font-heading text-2xl font-bold text-primary">
                  {formatTotal(total)}
                </span>
              </div>
              <button
                onClick={handleStartCheckout}
                disabled={cart.length === 0}
                className="w-full btn-primary-market text-[18px] rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Continuar compra</span>
              </button>
            </>
          )}

          {step === 'form' && (
            <button
              onClick={() => handleFormSubmit()}
              type="button"
              className="w-full btn-primary-market text-[18px] rounded-xl"
            >
              <span>Revisar pedido</span>
            </button>
          )}

          {step === 'confirmation' && (
            <div className="flex flex-col gap-4">
              <button
                onClick={handleConfirmAndSend}
                className="w-full btn-primary-market text-[18px] rounded-xl shadow-md"
              >
                <MessageCircle size={24} />
                <span>Confirmar y enviar</span>
              </button>
              <button
                onClick={() => setStep('form')}
                className="w-full min-h-[52px] text-[16px] font-bold text-muted-foreground hover:text-foreground transition-colors py-2 mb-2"
              >
                Modificar datos
              </button>
            </div>
          )}

          {step === 'success' && (
            <button
              onClick={handleReturnToHome}
              className="w-full border-2 border-border text-foreground flex items-center justify-center gap-2 min-h-[56px] rounded-xl hover:bg-secondary/10 transition-colors text-[18px] font-bold"
            >
              <span>Volver al inicio</span>
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
