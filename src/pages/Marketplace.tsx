import { useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductDetailsModal from '@/components/ProductDetailsModal';
import CartSidebar from '@/components/CartSidebar';
import { useToast } from '@/hooks/use-toast';
import ProductGrid from '@/components/ProductGrid';
import FilterSection from '@/components/FilterSection';
import CategoryFilters from '@/components/CategoryFilters';

const products = [
  {
    id: 1,
    name: "Handwoven Silk Saree",
    price: 3500,
    originalPrice: 4200,
    seller: "Rashida Begum",
    location: "Murshidabad",
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&h=600&auto=format&fit=crop",
    category: "Textiles",
    inStock: true
  },
  {
    id: 2,
    name: "Terracotta Horse Sculpture",
    price: 850,
    originalPrice: 1100,
    seller: "Gopal Das",
    location: "Birbhum",
    rating: 4.9,
    reviews: 67,
    image: "https://5.imimg.com/data5/SELLER/Default/2023/8/339493557/PE/ER/QR/118047773/terracotta.jpeg?q=80&w=800&h=600&auto=format&fit=crop",
    category: "Handicrafts",
    inStock: true
  },
  {
    id: 3,
    name: "Jute Shopping Bags Set",
    price: 450,
    originalPrice: 600,
    seller: "Sarita Mondal",
    location: "Nadia",
    rating: 4.6,
    reviews: 203,
    image: "https://cdn.vibecity.in/providers/6362311a17c98a00111b0052/4fc0ae4a-1e80-413b-a852-a60ff0a86251_a9084790-0ab5-4941-b01d-64fa3c1c4872-3X.png?q=80&w=800&h=600&auto=format&fit=crop",
    category: "Eco-Products",
    inStock: true
  },
  {
    id: 4,
    name: "Traditional Brass Utensils",
    price: 1200,
    originalPrice: 1500,
    seller: "Kumar Roy",
    location: "Hooghly",
    rating: 4.7,
    reviews: 89,
    image: "https://codesustain.in/cdn/shop/files/handmade-brass-pital-cutlery-set-4-pcs-971.jpg?q=80&w=800&h=600&auto=format&fit=crop",
    category: "Metalwork",
    inStock: false
  },
  {
    id: 5,
    name: "Bamboo Craft Collection",
    price: 650,
    originalPrice: 800,
    seller: "Anita Sharma",
    location: "Purulia",
    rating: 4.5,
    reviews: 156,
    image: "https://gaatha.org/wp-content/uploads/IMG_4451.jpg?q=80&w=800&h=600&auto=format&fit=crop",
    category: "Handicrafts",
    inStock: true
  },
  {
    id: 6,
    name: "Dokra Art Figurines",
    price: 950,
    originalPrice: 1200,
    seller: "Ravi Bauri",
    location: "Bankura",
    rating: 4.9,
    reviews: 78,
    image: "https://images-static.nykaa.com/media/catalog/product/9/b/9b2b426el-025-070_a.jpg?q=80&w=800&h=600&auto=format&fit=crop",
    category: "Metalwork",
    inStock: true
  }
];

const categories = ["All", "Textiles", "Handicrafts", "Eco-Products", "Metalwork"];

const locations = ["All", "Murshidabad", "Birbhum", "Nadia", "Hooghly", "Purulia", "Bankura"];

const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500 - ₹1000", min: 500, max: 1000 },
  { label: "₹1000 - ₹2000", min: 1000, max: 2000 },
  { label: "Above ₹2000", min: 2000, max: Infinity }
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  seller: string;
}

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { toast } = useToast();

  const filteredAndSortedProducts = (() => {
    let filtered = products.filter(product => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesLocation = selectedLocation === "All" || product.location === selectedLocation;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.seller.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStock = !showInStockOnly || product.inStock;
      
      const priceRange = priceRanges.find(range => range.label === selectedPriceRange);
      const matchesPrice = !priceRange || (product.price >= priceRange.min && product.price <= priceRange.max);
      
      return matchesCategory && matchesLocation && matchesSearch && matchesStock && matchesPrice;
    });

    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price);
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      case "name":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case "popular":
      default:
        return filtered.sort((a, b) => b.reviews - a.reviews);
    }
  })();

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedLocation("All");
    setSelectedPriceRange("All");
    setShowInStockOnly(false);
    setSearchTerm("");
  };

  const addToCart = (productId: number, quantity: number = 1) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === productId);
      if (existingItem) {
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
          seller: product.seller
        }];
      }
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    });
  };

  const handleBuyNow = (productId: number, quantity: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    addToCart(productId, quantity);
    
    toast({
      title: "Redirecting to checkout",
      description: `Processing ${quantity} x ${product.name}`,
    });
    
    console.log(`Buy now: ${quantity} x ${product.name}`);
    setIsModalOpen(false);
  };

  const handleCheckout = () => {
    toast({
      title: "Proceeding to checkout",
      description: `Processing ${cartItems.length} items`,
    });
    console.log('Checkout:', cartItems);
  };

  const openProductDetails = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-dark-base">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-16 md:pt-20 pb-6 md:pb-8 bg-gradient-to-r from-dark-base to-dark-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-text mb-4">
              Authentic Bengal Marketplace
            </h1>
            <p className="text-base md:text-lg text-secondary-text max-w-2xl mx-auto px-4 sm:px-0">
              Discover handcrafted treasures from rural artisans across West Bengal
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-text h-4 w-4 md:h-5 md:w-5" />
              <input
                type="text"
                placeholder="Search products, artisans, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 md:pl-10 pr-4 py-2 md:py-3 bg-dark-container border border-gray-600 rounded-lg text-primary-text placeholder-secondary-text focus:outline-none focus:border-terracotta text-sm md:text-base"
              />
            </div>
            
            <FilterSection
              isFiltersOpen={isFiltersOpen}
              setIsFiltersOpen={setIsFiltersOpen}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              selectedPriceRange={selectedPriceRange}
              setSelectedPriceRange={setSelectedPriceRange}
              showInStockOnly={showInStockOnly}
              setShowInStockOnly={setShowInStockOnly}
              clearFilters={clearFilters}
              locations={locations}
              priceRanges={priceRanges}
            />
            
            <div className="relative">
              <Button 
                onClick={() => setIsCartOpen(true)}
                variant="outline" 
                size="sm" 
                className="md:w-auto border-gray-600 text-secondary-text hover:text-white relative overflow-hidden group transition-all duration-500 hover:border-transparent"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
                <ShoppingCart className="h-4 w-4 mr-2 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative z-10">Cart</span>
              </Button>
              {totalCartItems > 0 && (
                <div className="absolute -top-2 -right-2 bg-terracotta text-white text-xs rounded-full h-5 w-5 flex items-center justify-center z-20 animate-pulse">
                  {totalCartItems}
                </div>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <CategoryFilters
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3">
            <p className="text-secondary-text text-sm md:text-base">
              Showing {filteredAndSortedProducts.length} products
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 bg-dark-container border-gray-600 text-primary-text">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300 text-black shadow-lg">
                <SelectItem 
                  value="popular" 
                  className="text-black cursor-pointer relative overflow-hidden group transition-all duration-300 hover:bg-transparent"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></div>
                  <span className="relative z-10 group-hover:font-bold group-hover:text-white transition-all duration-300 group-hover:scale-105">
                    Sort by: Popular
                  </span>
                </SelectItem>
                <SelectItem 
                  value="price-low" 
                  className="text-black cursor-pointer relative overflow-hidden group transition-all duration-300 hover:bg-transparent"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></div>
                  <span className="relative z-10 group-hover:font-bold group-hover:text-white transition-all duration-300 group-hover:scale-105">
                    Price: Low to High
                  </span>
                </SelectItem>
                <SelectItem 
                  value="price-high" 
                  className="text-black cursor-pointer relative overflow-hidden group transition-all duration-300 hover:bg-transparent"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></div>
                  <span className="relative z-10 group-hover:font-bold group-hover:text-white transition-all duration-300 group-hover:scale-105">
                    Price: High to Low
                  </span>
                </SelectItem>
                <SelectItem 
                  value="rating" 
                  className="text-black cursor-pointer relative overflow-hidden group transition-all duration-300 hover:bg-transparent"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></div>
                  <span className="relative z-10 group-hover:font-bold group-hover:text-white transition-all duration-300 group-hover:scale-105">
                    Rating
                  </span>
                </SelectItem>
                <SelectItem 
                  value="name" 
                  className="text-black cursor-pointer relative overflow-hidden group transition-all duration-300 hover:bg-transparent"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></div>
                  <span className="relative z-10 group-hover:font-bold group-hover:text-white transition-all duration-300 group-hover:scale-105">
                    Name A-Z
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ProductGrid
            products={filteredAndSortedProducts}
            onProductClick={openProductDetails}
            onBuyNow={handleBuyNow}
            onAddToCart={addToCart}
            clearFilters={clearFilters}
          />
        </div>
      </section>

      <Footer />

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={addToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Marketplace;
