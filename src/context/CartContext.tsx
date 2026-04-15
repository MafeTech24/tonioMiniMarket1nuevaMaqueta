import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

export interface CartItem {
  nombre: string;
  precio: number;
  precioFormateado: string;
  cantidad: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (producto: { nombre: string; precio: string }, cantidad?: number) => void;
  removeFromCart: (nombre: string) => void;
  updateQuantity: (nombre: string, cantidad: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const parsePrice = (priceStr: string) => {
  return parseInt(priceStr.replace(/[^0-9]/g, ""));
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (producto: { nombre: string; precio: string }, cantidad: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.nombre === producto.nombre);
      if (existing) {
        toast.success(`Se agregaron ${cantidad} unidades de ${producto.nombre}`);
        return prev.map((item) =>
          item.nombre === producto.nombre
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      toast.success(`${producto.nombre} agregado al carrito`);
      return [
        ...prev,
        {
          nombre: producto.nombre,
          precio: parsePrice(producto.precio),
          precioFormateado: producto.precio,
          cantidad: cantidad,
        },
      ];
    });
  };

  const removeFromCart = (nombre: string) => {
    setCart((prev) => prev.filter((item) => item.nombre !== nombre));
    toast.info("Producto eliminado del carrito");
  };

  const updateQuantity = (nombre: string, cantidad: number) => {
    if (cantidad <= 0) return;
    setCart((prev) =>
      prev.map((item) => (item.nombre === nombre ? { ...item, cantidad } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const itemCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};
