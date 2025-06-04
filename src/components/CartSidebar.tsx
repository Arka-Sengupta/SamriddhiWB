
import { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  seller: string;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

const CartSidebar = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout }: CartSidebarProps) => {
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Sidebar */}
      <div className="w-full max-w-md bg-dark-container border-l border-gray-700 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-primary-text flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Cart ({totalItems})
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-600 transition-colors"
          >
            <X className="h-5 w-5 text-primary-text" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="h-16 w-16 text-secondary-text mx-auto mb-4" />
              <p className="text-secondary-text">Your cart is empty</p>
              <p className="text-sm text-secondary-text mt-2">Add some products to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-dark-base rounded-lg p-3 border border-gray-700">
                  <div className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-primary-text line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-xs text-secondary-text">{item.seller}</p>
                      <p className="text-sm font-semibold text-primary-text mt-1">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-1 rounded border border-gray-600 hover:bg-gray-600"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-semibold text-primary-text min-w-[30px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded border border-gray-600 hover:bg-gray-600"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="text-right mt-2">
                    <span className="text-sm font-semibold text-primary-text">
                      Subtotal: ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-700 p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-primary-text">Total:</span>
              <span className="text-xl font-bold text-primary-text">₹{totalAmount}</span>
            </div>
            <Button
              onClick={onCheckout}
              className="w-full bg-terracotta hover:bg-terracotta/90"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
