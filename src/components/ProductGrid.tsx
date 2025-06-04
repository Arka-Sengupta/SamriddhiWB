
import { Star, MapPin, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onBuyNow: (productId: number, quantity: number) => void;
  onAddToCart: (productId: number, quantity: number) => void;
  clearFilters: () => void;
}

const ProductGrid = ({ products, onProductClick, onBuyNow, onAddToCart, clearFilters }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-8 md:py-12">
        <p className="text-secondary-text text-base md:text-lg">No products found matching your criteria.</p>
        <Button 
          onClick={clearFilters}
          className="mt-4 bg-terracotta hover:bg-terracotta/90"
        >
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <Card key={product.id} className="bg-dark-container border-gray-700 hover-lift group cursor-pointer">
          <div 
            className="relative overflow-hidden rounded-t-lg"
            onClick={() => onProductClick(product)}
          >
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-semibold text-sm md:text-base">Out of Stock</span>
              </div>
            )}
            <div className="absolute top-2 right-2 bg-success-green text-white px-2 py-1 rounded-full text-xs font-semibold">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          </div>
          
          <CardContent className="p-3 md:p-4">
            <div onClick={() => onProductClick(product)}>
              <h3 className="text-primary-text font-semibold mb-2 line-clamp-2 text-sm md:text-base">{product.name}</h3>
              
              <div className="flex items-center gap-1 mb-2">
                <Star className="h-3 w-3 md:h-4 md:w-4 fill-bengal-yellow text-bengal-yellow" />
                <span className="text-xs md:text-sm text-primary-text">{product.rating}</span>
                <span className="text-xs md:text-sm text-secondary-text">({product.reviews})</span>
              </div>

              <div className="flex items-center gap-1 mb-3 text-secondary-text">
                <MapPin className="h-3 w-3" />
                <span className="text-xs md:text-sm truncate">{product.seller}, {product.location}</span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-base md:text-lg font-bold text-primary-text">₹{product.price}</span>
                  <span className="text-xs md:text-sm text-secondary-text line-through ml-2">₹{product.originalPrice}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  onBuyNow(product.id, 1);
                }}
                disabled={!product.inStock}
                size="sm"
                className="flex-1 bg-bengal-yellow hover:bg-bengal-yellow/90 text-dark-base text-xs md:text-sm font-semibold relative overflow-hidden group transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 group-hover:scale-105 transition-transform duration-200">Buy Now</span>
              </Button>
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product.id, 1);
                }}
                disabled={!product.inStock}
                variant="outline"
                size="sm"
                className="flex-1 border-terracotta text-terracotta hover:bg-terracotta hover:text-white text-xs md:text-sm relative overflow-hidden group transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <ShoppingCart className="h-3 w-3 md:h-4 md:w-4 mr-1 relative z-10 group-hover:rotate-12 transition-transform duration-200" />
                <span className="relative z-10">Cart</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductGrid;
