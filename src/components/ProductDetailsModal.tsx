
import { useState } from 'react';
import { X, Star, MapPin, Plus, Minus, ShoppingCart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  seller: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  inStock: boolean;
}

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (productId: number, quantity: number) => void;
  onBuyNow: (productId: number, quantity: number) => void;
}

const ProductDetailsModal = ({ product, isOpen, onClose, onAddToCart, onBuyNow }: ProductDetailsModalProps) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
    setQuantity(1);
  };

  const handleBuyNow = () => {
    onBuyNow(product.id, quantity);
    setQuantity(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-4 bg-dark-container rounded-lg border border-gray-700 max-h-[90vh] overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-dark-base hover:bg-gray-600 transition-colors"
        >
          <X className="h-5 w-5 text-primary-text" />
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 md:h-96 object-cover rounded-lg"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                <span className="text-white font-semibold text-lg">Out of Stock</span>
              </div>
            )}
            <div className="absolute top-4 left-4 bg-success-green text-white px-3 py-1 rounded-full text-sm font-semibold">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold text-primary-text">{product.name}</h1>
            
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-bengal-yellow text-bengal-yellow" />
              <span className="text-primary-text font-semibold">{product.rating}</span>
              <span className="text-secondary-text">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-center gap-2 text-secondary-text">
              <MapPin className="h-4 w-4" />
              <span>{product.seller}, {product.location}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary-text">₹{product.price}</span>
                <span className="text-lg text-secondary-text line-through">₹{product.originalPrice}</span>
              </div>
              <p className="text-sm text-success-green">
                You save ₹{product.originalPrice - product.price} ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%)
              </p>
            </div>

            <div className="bg-dark-base p-4 rounded-lg">
              <p className="text-sm text-secondary-text mb-2">Category</p>
              <span className="inline-block bg-terracotta/20 text-terracotta px-3 py-1 rounded-full text-sm">
                {product.category}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-primary-text">Quantity:</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={decreaseQuantity}
                  className="p-2 rounded-full border border-gray-600 hover:bg-gray-600 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4 text-primary-text" />
                </button>
                <span className="text-xl font-semibold text-primary-text min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  className="p-2 rounded-full border border-gray-600 hover:bg-gray-600 transition-colors"
                >
                  <Plus className="h-4 w-4 text-primary-text" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex-1 bg-bengal-yellow hover:bg-bengal-yellow/90 text-dark-base font-semibold"
              >
                <Zap className="h-4 w-4 mr-2" />
                Buy Now
              </Button>
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                variant="outline"
                className="flex-1 border-terracotta text-terracotta hover:bg-terracotta hover:text-white"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>

            <div className="text-xs text-secondary-text space-y-1">
              <p>✓ Authentic handcrafted product</p>
              <p>✓ Direct from artisan</p>
              <p>✓ Secure payment</p>
              <p>✓ 7-day return policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
