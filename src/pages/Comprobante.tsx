import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Printer, MapPin, Phone, CreditCard, ShoppingBag, Clock, ArrowLeft } from 'lucide-react'

interface Pedido {
  id: string;
  numero_pedido: string;
  fecha: string;
  cliente_nombre: string;
  cliente_telefono: string;
  productos: {
    nombre: string;
    cantidad: number;
    precio: number;
    subtotal: number;
  }[];
  subtotal: number;
  costo_envio: number;
  total: number;
  calle: string;
  piso_dpto: string;
  barrio: string;
  direccion_completa: string;
  metodo_entrega: string;
  metodo_pago: string;
  notas: string;
  estado: string;
}

const Comprobante = () => {
  const { numeroPedido } = useParams<{ numeroPedido: string }>()
  const [pedido, setPedido] = useState<Pedido | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const { data, error } = await supabase
          .from('pedidos')
          .select('*')
          .eq('numero_pedido', numeroPedido)
          .single()

        if (error) throw error
        setPedido(data)
      } catch (err) {
        console.error('Error fetching pedido:', err)
      } finally {
        setLoading(false)
      }
    }

    if (numeroPedido) {
      fetchPedido()
    }
  }, [numeroPedido])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'pendiente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'en camino': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'entregado': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CC0000]"></div>
          <p className="text-gray-600 font-semibold italic">Cargando comprobante...</p>
        </div>
      </div>
    )
  }

  if (!pedido) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 gap-6">
        <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Pedido no encontrado</h2>
            <p className="text-gray-500">Lo sentimos, no pudimos encontrar el pedido #{numeroPedido}</p>
        </div>
        <Link to="/" className="inline-flex items-center gap-2 text-[#CC0000] font-bold hover:underline">
            <ArrowLeft size={20} />
            Volver a la tienda
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 font-sans print:p-0 print:bg-white">
      {/* Botones de acción (No se imprimen) */}
      <div className="max-w-2xl mx-auto mb-6 flex justify-between items-center no-print">
        <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-primary transition-all font-semibold">
          <ArrowLeft size={18} /> Volver al Inicio
        </Link>
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-3 bg-[#CC0000] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#b30000] transition-transform active:scale-95 shadow-lg"
        >
          <Printer size={20} /> Imprimir comprobante
        </button>
      </div>

      {/* COMPROBANTE A4 */}
      <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none">
        {/* Header */}
        <div className="bg-[#fcfcfc] border-b-4 border-[#CC0000] p-8 text-center relative overflow-hidden">
          {/* Marca de agua / Decoración */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-5 text-[#CC0000]/10 select-none">
             <ShoppingBag size={200} />
          </div>
          
          <h1 className="text-3xl font-black text-[#CC0000] tracking-tighter uppercase mb-1">Tonio MiniMarket</h1>
          <p className="text-gray-400 font-medium italic mb-6">"Siempre cerca tuyo"</p>
          
          <div className="flex flex-col items-center gap-1">
             <div className="bg-gray-100 px-4 py-2 rounded-lg inline-block border border-gray-200">
                <span className="text-gray-500 font-bold uppercase text-xs block">Número de Pedido</span>
                <span className="text-xl font-black text-gray-800 tracking-wider">#{pedido.numero_pedido}</span>
             </div>
             <div className="flex items-center gap-2 text-gray-400 mt-2 text-sm font-medium">
                <Clock size={16} /> {formatDate(pedido.fecha)}
             </div>
          </div>
        </div>

        {/* Cuerpo */}
        <div className="p-8 space-y-8">
          {/* Productos */}
          <section>
            <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#CC0000] mb-4 border-b-2 border-red-50 pb-2">
              <ShoppingBag size={14} /> Productos del Pedido
            </h4>
            <div className="space-y-4">
              {pedido.productos.map((prod, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2 rounded-lg transition-colors">
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{prod.nombre}</p>
                    <p className="text-xs text-gray-400 font-semibold">{prod.cantidad} unidad(es)</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-gray-900">{formatCurrency(prod.precio * prod.cantidad)}</p>
                    {prod.cantidad > 1 && <p className="text-[10px] text-gray-400 font-bold uppercase">({formatCurrency(prod.precio)} c/u)</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gray-50 rounded-xl p-5 border-2 border-gray-100 shadow-sm">
                <div className="flex justify-between text-gray-600 mb-2 font-medium">
                  <span>Subtotal productos:</span>
                  <span>{formatCurrency(pedido.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600 mb-4 font-medium">
                  <span className="flex items-center gap-2">Envío {pedido.metodo_entrega === 'Delivery' && "(Distancia calculada)"}:</span>
                  <span className={pedido.costo_envio === 0 ? 'text-[#2E7D32] font-black' : ''}>
                    {pedido.costo_envio === 0 ? 'Gratis' : formatCurrency(pedido.costo_envio)}
                  </span>
                </div>
                <div className="border-t-2 border-dashed border-gray-300 pt-4 flex justify-between items-center">
                  <span className="text-lg font-black text-gray-800 uppercase tracking-wide">Total a pagar:</span>
                  <span className="text-3xl font-black text-[#CC0000]">{formatCurrency(pedido.total)}</span>
                </div>
            </div>
          </section>

          {/* Información de entrega y cliente */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#CC0000] mb-4 border-b-2 border-red-50 pb-2">
                <MapPin size={14} /> Entrega
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase">Modalidad</label>
                  <p className="font-bold text-gray-800 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${pedido.metodo_entrega === 'Delivery' ? 'bg-blue-500' : 'bg-gray-400'}`}></span>
                    {pedido.metodo_entrega}
                  </p>
                </div>
                {pedido.metodo_entrega === 'Delivery' && (
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase">Dirección completa</label>
                    <p className="font-bold text-gray-800 leading-tight">{pedido.direccion_completa}</p>
                    <p className="text-[10px] text-[#2E7D32] font-bold mt-1 tracking-tighter uppercase whitespace-nowrap overflow-hidden text-ellipsis">⚠️ Verificar distancia al entregar</p>
                  </div>
                )}
              </div>
            </section>

            <section>
              <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#CC0000] mb-4 border-b-2 border-red-50 pb-2">
                <Clock size={14} /> Datos del Cliente
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase">Nombre</label>
                  <p className="font-bold text-gray-800 truncate">{pedido.cliente_nombre}</p>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase">Teléfono</label>
                  <p className="font-bold text-gray-800 flex items-center gap-2">
                    <Phone size={14} className="text-[#CC0000]" /> {pedido.cliente_telefono}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <section>
            <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#CC0000] mb-4 border-b-2 border-red-50 pb-2">
              <CreditCard size={14} /> Pago y Notas
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase">Medio de Pago</label>
                <p className="font-bold text-gray-800 inline-flex items-center border-b-2 border-[#CC0000]/10">{pedido.metodo_pago}</p>
              </div>
              <div>
                {pedido.notas && (
                  <>
                    <label className="text-[10px] font-black text-gray-400 uppercase">Notas adicionales</label>
                    <p className="font-medium text-gray-600 italic leading-relaxed">"{pedido.notas}"</p>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* Estado Final con Badge */}
          <div className="pt-8 border-t border-gray-100 flex flex-col items-center gap-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Estado Actual del Pedido</label>
            <div className={`px-8 py-3 rounded-full border-2 font-black text-sm uppercase tracking-widest shadow-sm ${getStatusColor(pedido.estado)}`}>
              {pedido.estado}
            </div>
          </div>
        </div>

        {/* Footer Comprobante */}
        <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
           <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Gracias por elegir Tonio MiniMarket — Córdoba Capital</p>
        </div>
      </div>
      
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0; padding: 0; }
          .min-h-screen { height: auto !important; min-height: 0 !important; overflow: visible !important; }
          .shadow-2xl { box-shadow: none !important; }
          .rounded-2xl { border-radius: 0 !important; }
          .mx-auto { margin: 0 !important; }
          .max-w-2xl { max-width: 100% !important; }
        }
      `}</style>
    </div>
  )
}

export default Comprobante
